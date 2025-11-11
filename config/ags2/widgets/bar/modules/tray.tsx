import { Gtk } from "ags/gtk4"
import AstalTray from "gi://AstalTray"
import { Accessor, createBinding, For } from "gnim"

export default function Tray() {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  return (
    <box class="bar-tray" orientation={Gtk.Orientation.VERTICAL}>
      <For each={items}>
        {(item, _: Accessor<number>) => (
          <menubutton
            tooltipMarkup={item.tooltipMarkup}
            menuModel={item.menuModel}
          >
            <image gicon={item.gicon} />
            {item.actionGroup}
          </menubutton>
        )}
      </For>
    </box>
  )
}
