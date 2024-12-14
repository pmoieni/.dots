import { Gtk } from "astal/gtk3"
import { bind, exec } from "astal"
import PopupWindow from "@widgets/PopupWindow"
import options from "options"
import { toggleWindow } from "@lib/utils"
import Powermenu from "@services/powermenu"

export default () => {
    const powermenu = Powermenu.get_default()

    return (
        <PopupWindow name="verification" namespace="verification">
            <box
                spacing={options.theme.spacing()}
                vertical
                className="verification"
            >
                <label
                    halign={Gtk.Align.CENTER}
                    className="title"
                    label={bind(powermenu, "title")}
                />
                <label
                    halign={Gtk.Align.CENTER}
                    className="description"
                    label="Are you sure?"
                />
                <box spacing={options.theme.spacing()} homogeneous>
                    <button
                        canFocus
                        onClicked={() => {
                            exec(powermenu.cmd)
                            toggleWindow("verification")
                        }}
                    >
                        <label label="Yes" />
                    </button>
                    <button
                        canFocus
                        onClicked={() => toggleWindow("verification")}
                    >
                        <label label="No" />
                    </button>
                </box>
            </box>
        </PopupWindow>
    )
}
