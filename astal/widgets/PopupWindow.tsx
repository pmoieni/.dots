import { App, Astal, Gdk, Widget } from "astal/gtk3";
import { scrimWindowNames } from "@lib/vars";

export default function ({
  application = App,
  layer = Astal.Layer.OVERLAY,
  keymode = Astal.Keymode.EXCLUSIVE,
  visible = false,
  child,
  setup,
  className,
  onKeyReleaseEvent,
  ...props
}: Widget.WindowProps) {
  return (
    <window
      className={`popup-window ${className}`}
      application={application}
      layer={layer}
      keymode={keymode}
      visible={visible}
      onKeyReleaseEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) self.visible = false;

        if (onKeyReleaseEvent) onKeyReleaseEvent(self, event);
      }}
      {...props}
      setup={(self) => {
        scrimWindowNames.set([...scrimWindowNames.get(), self.name]);

        self.hook(self, "notify::visible", () => {
          if (!self.visible) {
            App.get_window("scrim")?.set_visible(false);
          }
        });
        if (setup) setup(self);
      }}
    >
      {child}
    </window>
  );
}
