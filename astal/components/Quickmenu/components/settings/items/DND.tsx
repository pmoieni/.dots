import Notifd from "gi://AstalNotifd";
import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { ToggleButton } from "../../../widgets/Toggle";
import { getIcon, icons } from "@assets/icons";

export default function () {
  const notifd = Notifd.get_default();

  return (
    <ToggleButton
      state={bind(notifd, "dontDisturb")}
      onToggled={() => (notifd.dontDisturb = !notifd.dontDisturb)}
    >
      <box hexpand halign={Gtk.Align.CENTER}>
        <icon
          icon={bind(notifd, "dontDisturb").as((dnd) =>
            dnd
              ? getIcon(icons.notifications.silent)
              : getIcon(icons.notifications.noisy),
          )}
        />
      </box>
    </ToggleButton>
  );
}
