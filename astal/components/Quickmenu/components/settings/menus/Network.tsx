import Network from "gi://AstalNetwork"
import { Gtk } from "astal/gtk3"
import { bind } from "astal"
import Menu from "../Menu"
import { icons } from "@assets/icons"
import options from "options"

export default () => {
    const network = Network.get_default()
    const nmClient = network.get_client()
    const { wifi } = Network.get_default()

    if (!wifi) {
        return null
    }

    return (
        <Menu name="network" action={() => wifi.scan()}>
            <box
                spacing={options.theme.spacing.value}
                className="list"
                vertical
            >
                {bind(wifi, "accessPoints").as((points) =>
                    points.map((ap) => (
                        <button
                            className={bind(wifi, "activeAccessPoint").as(
                                (aap) => (aap === ap ? "active" : "")
                            )}
                            onClicked={() =>
                                nmClient.activate_connection_async()
                            }
                        >
                            <box spacing={options.theme.spacing.value}>
                                <icon icon={ap.iconName} />
                                <label label={ap.ssid || ""} />
                                <icon
                                    visible={bind(wifi, "activeAccessPoint").as(
                                        (aap) => aap === ap
                                    )}
                                    icon={icons.ui.tick}
                                    hexpand
                                    halign={Gtk.Align.END}
                                />
                            </box>
                        </button>
                    ))
                )}
            </box>
        </Menu>
    )
}
