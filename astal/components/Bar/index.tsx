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
import { bind, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";

export default function Bar(monitor: number) {
  const hypr = Hyprland.get_default();

  const { position, dock, autohide } = options.widgets.bar;
  const isWorkspaceEmpty = bind(hypr, "focusedWorkspace").as(
    (fw) => fw.clients.length === 0,
  );
  const barVisible = Variable.derive(
    [isWorkspaceEmpty, autohide],
    (isEmpty, ah) => {
      if (isEmpty) {
        return true;
      }

      return !ah;
    },
  );
  const exclusivity = Variable.derive(
    [isWorkspaceEmpty, autohide],
    (isEmpty, ah) => {
      if (!ah || (ah && isEmpty)) {
        return Astal.Exclusivity.EXCLUSIVE;
      }

      return Astal.Exclusivity.NORMAL;
    },
  );

  function hide() {
    if (isWorkspaceEmpty.get()) return;

    autohide.value && barVisible.set(false);
  }

  function show() {
    autohide.value && barVisible.set(true);
  }

  const css = Variable.derive([position, dock], (p, d) => {
    let css = "";
    if (d) {
      css += "border-radius: 0; margin: 0;";
      return css;
    }

    const { spacing } = options.theme;

    switch (p) {
      case "top":
        css += `margin: ${spacing.value} ${spacing.value} 0 ${spacing.value};`;
        break;
      case "bottom":
        css += `margin: 0 ${spacing.value} ${spacing.value} ${spacing.value};`;
        break;
    }

    return css;
  });

  return (
    <window
      name="bar"
      namespace="bar"
      monitor={monitor}
      exclusivity={exclusivity()}
      anchor={position().as((p) =>
        p === "top"
          ? Astal.WindowAnchor.TOP |
            Astal.WindowAnchor.LEFT |
            Astal.WindowAnchor.RIGHT
          : Astal.WindowAnchor.BOTTOM |
            Astal.WindowAnchor.LEFT |
            Astal.WindowAnchor.RIGHT,
      )}
      application={App}
    >
      <eventbox onHover={show} onHoverLost={hide}>
        <revealer
          revealChild={barVisible()}
          transitionDuration={options.transition()}
          transitionType={position().as((p) =>
            p === "top"
              ? Gtk.RevealerTransitionType.SLIDE_DOWN
              : Gtk.RevealerTransitionType.SLIDE_UP,
          )}
        >
          <centerbox className="bar" css={css()}>
            <box spacing={options.theme.spacing()} expand>
              <AppLauncher />
              <Workspaces />
            </box>
            <box spacing={options.theme.spacing()} expand>
              <Media />
            </box>
            <box
              spacing={options.theme.spacing()}
              expand
              halign={Gtk.Align.END}
            >
              <SysTray />
              <Screenrecord />
              <QuickMenu />
              <Battery />
              <Date />
            </box>
          </centerbox>
        </revealer>
        <box css="padding: 1px;" />
      </eventbox>
    </window>
  );
}
