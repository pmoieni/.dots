import { App } from "astal/gtk3"
import { GLib, Variable } from "astal"

export default function () {
    const datetime = Variable<GLib.DateTime>(
        GLib.DateTime.new_now_local()
    ).poll(1000, () => GLib.DateTime.new_now_local())

    return (
        <button
            className="bar-date"
            onDestroy={() => datetime.drop()}
            onClicked={() => App.toggle_window("datemenu")}
        >
            <label
                className="time"
                label={datetime().as((dt) => dt.format("%H:%M")!)}
            />
        </button>
    )
}
