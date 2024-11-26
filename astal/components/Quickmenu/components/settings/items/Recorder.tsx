import { Gtk } from "astal/gtk3";
import { ToggleButton } from "../../../widgets/Toggle";
import { icons } from "@assets/icons";
import { bind } from "astal";
import Screenrecord from "@services/screenrecord";
import { toggleWindow } from "@lib/utils";

export default function () {
  const screenrecord = Screenrecord.get_default();

  function onClick() {
    if (screenrecord.recording) {
      screenrecord.stop();
      return;
    }

    toggleWindow("recorder");
  }

  return (
    <ToggleButton state={bind(screenrecord, "recording")} onClicked={onClick}>
      <box hexpand halign={Gtk.Align.CENTER}>
        <icon icon={icons.recorder.recording} />
      </box>
    </ToggleButton>
  );
}
