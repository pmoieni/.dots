import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import GLib from "gi://GLib"

export default function Time() {
  const time = createPoll(GLib.DateTime.new_now_local(), 1000, () =>
    GLib.DateTime.new_now_local(),
  )

  return (
    <button class="bar-time">
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label class="hour" label={time.as((t) => t.get_hour().toString())} />
        <label
          class="minute"
          label={time.as((t) => t.get_minute().toString())}
        />
      </box>
    </button>
  )
}
