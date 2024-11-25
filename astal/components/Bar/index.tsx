import { App, Astal, Gtk } from "astal/gtk3";
import Workspaces from "./components/Workspaces";
import SysTray from "./components/Tray";
import Date from "./components/Date";
import Media from "./components/Media";
import AppLauncher from "./components/AppLauncher";
import QuickMenu from "./components/QuickMenu";
import Screenrecord from "./components/Screenrecord";
import Battery from "./components/Battery";
import options from "options";

export default function Bar(monitor: number) {
  return (
    <window
      name="bar"
      namespace="bar"
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox
        className="bar horizontal"
        css={options.widgets.bar
          .dock()
          .as((dock) => (dock ? "border-radius: 0; margin: 0;" : ""))}
      >
        <box className="horizontal" expand>
          <AppLauncher />
          <Workspaces />
        </box>
        <box className="horizontal" expand>
          <Media />
        </box>
        <box className="horizontal" expand halign={Gtk.Align.END}>
          <SysTray />
          <Screenrecord />
          <QuickMenu />
          <Battery />
          <Date />
        </box>
      </centerbox>
    </window>
  );
}
