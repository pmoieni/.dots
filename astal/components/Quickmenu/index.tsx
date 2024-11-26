import { Astal } from "astal/gtk3";
import Notifications from "./components/notifications/Notifications";
import Settings from "./components/settings/Settings";
import PopupWindow from "@widgets/PopupWindow";

export default function () {
  return (
    <PopupWindow
      name="quickmenu"
      namespace="quickmenu"
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.BOTTOM
      }
      exclusivity={Astal.Exclusivity.NORMAL}
    >
      <box widthRequest={400} expand className="quickmenu" vertical>
        <Notifications />
        <Settings />
      </box>
    </PopupWindow>
  );
}
