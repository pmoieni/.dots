import { Gtk, Widget } from "astal/gtk3";
import { bind, exec } from "astal";
import { toggleWindow } from "@lib/utils";
import PopupWindow from "@widgets/PopupWindow";

export default () => {
  return (
    <PopupWindow
      name={"verification"}
      namespace={"verification"}
      onKeyPressEvent={(self, event) => {
        const [keyEvent, keyCode] = event.get_keycode();
        if (keyEvent && keyCode == 9) {
          toggleWindow(self.name);
        }
      }}
      setup={(self) =>
        self.hook(self, "notify::visible", () => {
          button.ref!.grab_focus();
        })
      }
    >
      <box spacing={spacing * 2} vertical className={"verification"}>
        <label
          halign={Gtk.Align.START}
          className="verification__title"
          label={bind(PowermenuService, "title")}
        />
        <label
          halign={Gtk.Align.START}
          className="verification__description"
          label={"Are you sure?"}
        />
        <box hexpand={false} spacing={spacing} halign={Gtk.Align.END}>
          <Button
            buttonType="outlined"
            canFocus
            onClicked={() => toggleWindow("verification")}
          >
            <label label={"No"} />
          </Button>
          <Button
            canFocus
            onClicked={() => {
              exec(PowermenuService.cmd);
              toggleWindow("verification");
            }}
            setup={(self) => (button.ref = self)}
          >
            <label label={bind(PowermenuService, "title")} />
          </Button>
        </box>
      </box>
    </PopupWindow>
  );
};
