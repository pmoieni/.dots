import { App } from "astal/gtk3"
import { Gdk } from "astal/gtk3"
import { bind } from "astal"
import Tray from "gi://AstalTray"
import options from "options"

export default function SysTray() {
    const tray = Tray.get_default()

    return (
        <box spacing={options.theme.spacing()} className="bar-tray">
            {bind(tray, "items").as((items) =>
                items.map((item) => {
                    if (item.iconThemePath) App.add_icons(item.iconThemePath)

                    const menu = item.create_menu()

                    return (
                        <button
                            tooltipMarkup={bind(item, "tooltipMarkup")}
                            onDestroy={() => menu?.destroy()}
                            onClickRelease={(self) => {
                                menu?.popup_at_widget(
                                    self,
                                    Gdk.Gravity.SOUTH,
                                    Gdk.Gravity.NORTH,
                                    null
                                )
                            }}
                        >
                            <icon gIcon={bind(item, "gicon")} />
                        </button>
                    )
                })
            )}
        </box>
    )
}
