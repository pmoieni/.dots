import { bind } from "astal"
import { Gtk } from "astal/gtk3"
import { ArrowToggleButton } from "../../../widgets/Toggle"
import { icons } from "@assets/icons"
import Bluetooth from "gi://AstalBluetooth"
import { settingsMenu } from "../Settings"

export default function () {
    const bluetooth = Bluetooth.get_default()

    return (
        <ArrowToggleButton
            state={bind(bluetooth, "isPowered")}
            onToggled={() => bluetooth.toggle()}
            onActivate={() => settingsMenu.set("bluetooth")}
        >
            <box hexpand halign={Gtk.Align.CENTER}>
                <icon
                    icon={bind(bluetooth, "isPowered").as((ic) =>
                        ic ? icons.bluetooth.enabled : icons.bluetooth.disabled
                    )}
                />
            </box>
        </ArrowToggleButton>
    )
}
