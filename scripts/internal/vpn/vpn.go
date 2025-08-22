package vpn

import (
	"flag"
	"log"

	"github.com/pmoieni/.dots/scripts/internal/vpn/outline"
)

type VPN struct {
}

func New() *VPN {
	return &VPN{}
}

func (v *VPN) Run() {
	app := outline.Outline{
		TransportConfig: flag.String("transport", "", "Transport config"),
		RoutingConfig: &outline.RoutingConfig{
			TunDeviceName:        "outline233",
			TunDeviceIP:          "10.233.233.1",
			TunDeviceMTU:         1500, // todo: read this from netlink
			TunGatewayCIDR:       "10.233.233.2/32",
			RoutingTableID:       233,
			RoutingTablePriority: 23333,
			DNSServerIP:          "9.9.9.9",
		},
	}
	flag.Parse()

	if err := app.Run(); err != nil {
		log.Fatalf("%v\n", err)
	}
}

func (v *VPN) InitWarp() {

}

func (v *VPN) InitOutline() {

}
