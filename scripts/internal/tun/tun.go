package tun

import (
	"errors"
	"fmt"

	"github.com/Jigsaw-Code/outline-sdk/network"
	"github.com/sina-ghaderi/tunnel"
	"github.com/vishvananda/netlink"
)

type TUN struct {
	*tunnel.Iface
	link netlink.Link
}

var _ network.IPDevice = (*TUN)(nil)

func New() *TUN {
	return &TUN{}
}

func (t *TUN) SetDevice(name, ip string) error {
	device, err := tunnel.New(tunnel.Config{Name: name, Persist: false})
	if err != nil {
		return errors.New("failed to set TUN device: " + err.Error())
	}

	defer func() {
		if err != nil {
			device.Close() // TODO: handle error
		}
	}()

	tunLink, err := netlink.LinkByName(name)
	if err != nil {
		return fmt.Errorf("newly created TUN/TAP device '%s' not found: %w", name, err)
	}

	if err := t.configureSubnet(ip); err != nil {
		return fmt.Errorf("failed to configure TUN/TAP device subnet: %w", err)
	}

	if err := t.bringUp(); err != nil {
		return fmt.Errorf("failed to bring up TUN/TAP device: %w", err)
	}

	t.Iface = device
	t.link = tunLink

	return nil
}

func (t *TUN) MTU() int {
	return 1500
}

func (t *TUN) configureSubnet(ip string) error {
	subnet := ip + "/32"
	addr, err := netlink.ParseAddr(subnet)
	if err != nil {
		return fmt.Errorf("subnet address '%s' is not valid: %w", subnet, err)
	}
	if err := netlink.AddrAdd(t.link, addr); err != nil {
		return fmt.Errorf("failed to add subnet to TUN/TAP device '%s': %w", t.Name(), err)
	}
	return nil
}

func (t *TUN) bringUp() error {
	if err := netlink.LinkSetUp(t.link); err != nil {
		return fmt.Errorf("failed to bring TUN/TAP device '%s' up: %w", t.Name(), err)
	}
	return nil
}
