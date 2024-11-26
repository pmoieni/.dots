import Wp from "gi://AstalWp";
import { bind } from "astal";
import { micIcon } from "@lib/vars";
import options from "options";

export default function () {
  const mic = Wp.get_default()!.defaultMicrophone;
  const volume = bind(mic, "volume");

  return (
    <box spacing={options.theme.spacing()} className="slider-box">
      <button
        onClicked={() =>
          mic.get_mute() ? mic.set_mute(false) : mic.set_mute(true)
        }
      >
        <icon icon={micIcon} />
      </button>
      <slider
        hexpand
        value={volume}
        min={0}
        max={1}
        onDragged={({ value }) => mic.set_volume(value)}
      />
    </box>
  );
}
