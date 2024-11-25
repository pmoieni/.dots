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
import { Variable } from "astal";

export default function Bar(monitor: number) {
  const { position, dock, autohide } = options.widgets.bar;
  const barVisible = Variable(!autohide.value);

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
      exclusivity={autohide().as((ah) =>
        ah ? Astal.Exclusivity.NORMAL : Astal.Exclusivity.EXCLUSIVE,
      )}
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
      <eventbox
        onHover={() => autohide.value && barVisible.set(true)}
        onHoverLost={() => autohide.value && barVisible.set(false)}
      >
        <revealer
          revealChild={barVisible()}
          transitionDuration={options.transition()}
          transitionType={position().as((p) =>
            p === "top"
              ? Gtk.RevealerTransitionType.SLIDE_DOWN
              : Gtk.RevealerTransitionType.SLIDE_UP,
          )}
        >
          <centerbox className="bar horizontal" css={css()}>
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
        </revealer>
        <box css="padding: 1px;" />
      </eventbox>
    </window>
  );
}
