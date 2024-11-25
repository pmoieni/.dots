import { App, Astal, Gdk } from "astal/gtk3";
import Notifications from "./components/notifications/Notifications";
import Settings from "./components/settings/Settings";

export default function () {
  return (
    <window
      visible={false}
      name="quickmenu"
      namespace="quickmenu"
      application={App}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.BOTTOM
      }
      exclusivity={Astal.Exclusivity.NORMAL}
      keymode={Astal.Keymode.ON_DEMAND}
      onKeyPressEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
      }}
    >
      <box widthRequest={400} expand className="quickmenu" vertical>
        <Notifications />
        <Settings />
      </box>
    </window>
  );
}
