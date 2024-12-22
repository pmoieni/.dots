import { Gtk } from "astal/gtk3"
import { icons } from "@assets/icons"
import { settingsMenu } from "./Settings"
import options from "options"

type PageProps = {
    name: string
    child?: JSX.Element
    action?: () => void
}

export default ({ name, child, action = undefined }: PageProps) => {
    return (
        <box
            name={name}
            className={`menu ${name}`}
            spacing={options.theme.spacing()}
            vertical
        >
            <centerbox className="header">
                <button
                    hexpand={false}
                    halign={Gtk.Align.START}
                    onClicked={() => settingsMenu.set("main")}
                >
                    <icon icon={icons.arrow.left} />
                </button>
                <label halign={Gtk.Align.CENTER} hexpand label={name} />
                {action ? (
                    <button
                        halign={Gtk.Align.END}
                        hexpand={false}
                        onClicked={action}
                    >
                        <icon hexpand={false} icon={icons.ui.refresh} />
                    </button>
                ) : (
                    <box />
                )}
            </centerbox>
            <scrollable propagateNaturalHeight className="content">
                {child}
            </scrollable>
        </box>
    )
}
