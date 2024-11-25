import { getIcon, icons } from "@assets/icons";
import { Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import options from "options";
import { bind } from "astal";
import Notification from "@widgets/Notification";

export default function () {
  const notifd = Notifd.get_default();

  function clearAll() {
    notifd.notifications.forEach((n) => n.dismiss());
  }

  return (
    <box
      vexpand
      spacing={options.theme.spacing.value}
      className="notifications"
      vertical
    >
      <box className="header horizontal" hexpand>
        <label halign={Gtk.Align.START} hexpand label="Notifications" />
        <button onClick={clearAll} halign={Gtk.Align.END}>
          <box>
            <icon icon={getIcon(icons.trash.full)} />
            <label label="Clear all" />
          </box>
        </button>
      </box>
      <scrollable vexpand>
        <box className="list" spacing={options.theme.spacing()} vertical>
          {bind(notifd, "notifications").as((ns) =>
            ns.length === 0 ? (
              <label className="placeholder" label="inbox is empty" />
            ) : (
              ns.map((n) =>
                Notification({
                  notification: n!,
                }),
              )
            ),
          )}
        </box>
      </scrollable>
    </box>
  );
}
