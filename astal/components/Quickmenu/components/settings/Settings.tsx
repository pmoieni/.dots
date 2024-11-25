import options from "options";
import Main from "./menus/Main";
import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Network from "./menus/Network";
import Bluetooth from "./menus/Bluetooth";

export const settingsMenu = Variable("main");

export default function () {
  return (
    <box className="settings" spacing={options.theme.spacing()} vertical>
      <box className="header">
        <label halign={Gtk.Align.START} label="Quick menu" />
      </box>
      <stack
        transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
        transitionDuration={options.transition()}
        shown={settingsMenu()}
      >
        <Main />
        <Network />
        <Bluetooth />
      </stack>
    </box>
  );
}
