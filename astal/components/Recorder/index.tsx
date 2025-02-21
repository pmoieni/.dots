import { toggleWindow } from "@lib/utils"
import Screenrecord from "@services/screenrecord"
import PopupWindow from "@widgets/PopupWindow"
import { Variable } from "astal"
import { Astal, Gtk } from "astal/gtk3"
import { Switch } from "astal/gtk3/widget"
import options from "options"

function Option({ title, val }: { title: string; val: Variable<boolean> }) {
    const sw = <switch halign={Gtk.Align.END} active={val()}></switch>

    sw.connect("notify::active", (sw: Switch) => val.set(sw.active))

    return (
        <box hexpand spacing={options.theme.spacing()} className="option">
            <label hexpand halign={Gtk.Align.START} label={title} />
            {sw}
        </box>
    )
}

export default function () {
    const full = Variable(true)
    const recordAudio = Variable(false)

    const screenrecord = Screenrecord.get_default()

    return (
        <PopupWindow
            name="recorder"
            namespace="recorder"
            anchor={options.widgets.bar
                .position()
                .as((p) =>
                    p === "top"
                        ? Astal.WindowAnchor.TOP
                        : Astal.WindowAnchor.BOTTOM
                )}
            exclusivity={Astal.Exclusivity.NORMAL}
        >
            <box
                spacing={options.theme.spacing()}
                className="recorder"
                vertical
            >
                <box
                    spacing={options.theme.spacing()}
                    className="options"
                    vertical
                >
                    <Option title="full screen" val={full} />
                    <Option title="record audio" val={recordAudio} />
                </box>
                <button
                    onClicked={() => {
                        toggleWindow("recorder")
                        screenrecord.start(full.get(), recordAudio.get())
                    }}
                >
                    <label label="Start recording" />
                </button>
            </box>
        </PopupWindow>
    )
}
