import Wp from "gi://AstalWp";
import { bind } from "astal";
import { speakerIcon } from "@lib/vars";

export default function () {
  const speaker = Wp.get_default()!.defaultSpeaker;
  const volume = bind(speaker, "volume");

  return (
    <box className="slider-box horizontal">
      <button
        onClicked={() =>
          speaker.get_mute() ? speaker.set_mute(false) : speaker.set_mute(true)
        }
      >
        <icon icon={speakerIcon()} />
      </button>
      <slider
        hexpand
        value={volume}
        min={0}
        max={1}
        onDragged={({ value }) => speaker.set_volume(value)}
      />
    </box>
  );
}
