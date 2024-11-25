import { App, Astal, Widget } from "astal/gtk3";
import { scrimWindowNames } from "@lib/vars";
import { activePopupWindows } from "@lib/utils";

export default ({
  application = App,
  layer = Astal.Layer.OVERLAY,
  keymode = Astal.Keymode.EXCLUSIVE,
  visible = false,
  child,
  setup,
  className,
  ...props
}: Widget.WindowProps) => (
  <window
    className={`popup-window ${className}`}
    application={application}
    layer={layer}
    keymode={keymode}
    visible={visible}
    {...props}
    setup={(self) => {
      scrimWindowNames.set([...scrimWindowNames.get(), self.name]);

      self.hook(self, "notify::visible", () => {
        const activePopups = activePopupWindows();
        if (activePopups.length == 0) {
          App.get_window("scrim")?.set_visible(false);
        }
      });
      if (setup) setup(self);
    }}
  >
    {child}
  </window>
);
