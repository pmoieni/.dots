package outline

import (
	"fmt"
	"io"
	"log"
	"os"
	"os/signal"
	"sync"

	"github.com/pmoieni/.dots/scripts/internal/tun"
	"golang.org/x/sys/unix"
)

var logging = &struct {
	Debug, Info, Warn, Err *log.Logger
}{
	Debug: log.New(io.Discard, "[DEBUG] ", log.LstdFlags),
	Info:  log.New(os.Stdout, "[INFO] ", log.LstdFlags),
	Warn:  log.New(os.Stderr, "[WARN] ", log.LstdFlags),
	Err:   log.New(os.Stderr, "[ERROR] ", log.LstdFlags),
}

type Outline struct {
	TransportConfig *string
	RoutingConfig   *RoutingConfig
}

type RoutingConfig struct {
	TunDeviceName        string
	TunDeviceIP          string
	TunDeviceMTU         int
	TunGatewayCIDR       string
	RoutingTableID       int
	RoutingTablePriority int
	DNSServerIP          string
}

func (outline *Outline) Run() error {
	// this WaitGroup must Wait() after tun is closed
	trafficCopyWg := &sync.WaitGroup{}
	defer trafficCopyWg.Wait()

	tunDevice := tun.New()
	if err := tunDevice.SetDevice(outline.RoutingConfig.TunDeviceName, outline.RoutingConfig.TunDeviceIP); err != nil {
		return fmt.Errorf("failed to create tun device: %w", err)
	}
	defer tunDevice.Close()

	// disable IPv6 before resolving Shadowsocks server IP
	// not sure if this is needed
	// prevIPv6, err := enableIPv6(false)
	// if err != nil {
	//	return fmt.Errorf("failed to disable IPv6: %w", err)
	// }
	// defer enableIPv6(prevIPv6)

	od, err := NewOutlineDevice(*outline.TransportConfig)
	if err != nil {
		return fmt.Errorf("failed to create OutlineDevice: %w", err)
	}
	defer od.Close()

	od.Refresh()

	// Copy the traffic from tun device to OutlineDevice bidirectionally
	trafficCopyWg.Add(2)
	go func() {
		defer trafficCopyWg.Done()
		written, err := io.Copy(od, tunDevice)
		logging.Info.Printf("tun -> OutlineDevice stopped: %v %v\n", written, err)
	}()
	go func() {
		defer trafficCopyWg.Done()
		written, err := io.Copy(tunDevice, od)
		logging.Info.Printf("OutlineDevice -> tun stopped: %v %v\n", written, err)
	}()

	err = setSystemDNSServer(outline.RoutingConfig.DNSServerIP)
	if err != nil {
		return fmt.Errorf("failed to configure system DNS: %w", err)
	}
	defer restoreSystemDNSServer()

	if err := startRouting(od.GetServerIP().String(), outline.RoutingConfig); err != nil {
		return fmt.Errorf("failed to configure routing: %w", err)
	}
	defer stopRouting(outline.RoutingConfig.RoutingTableID)

	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, unix.SIGTERM, unix.SIGHUP)
	s := <-sigc
	logging.Info.Printf("received %v, terminating...\n", s)
	return nil
}
