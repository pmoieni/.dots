import { bind } from "astal"
import Tray from "gi://AstalTray"
import options from "options"

export default function SysTray() {
    const tray = Tray.get_default()

    return (
        <box spacing={options.theme.spacing()} className="bar-tray">
            {bind(tray, "items").as((items) =>
                items.map((item) => (
                    <menubutton
                        tooltipMarkup={bind(item, "tooltipMarkup")}
                        usePopover={false}
                        actionGroup={bind(item, "actionGroup").as((ag) => [
                            "dbusmenu",
                            ag,
                        ])}
                        menuModel={bind(item, "menuModel")}
                    >
                        <icon gicon={bind(item, "gicon")} />
                    </menubutton>
                ))
            )}
        </box>
    )
}
