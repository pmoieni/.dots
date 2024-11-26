import { getIcon, icons } from "@assets/icons";
import Screenrecord from "@services/screenrecord";
import { bind } from "astal";
import options from "options";

export default function () {
  const screenrecord = Screenrecord.get_default();

  return (
    <button
      className="bar-screenrecord"
      visible={bind(screenrecord, "recording").as(Boolean)}
      onClicked={() => screenrecord.stop()}
    >
      <box spacing={options.theme.spacing()}>
        <icon icon={getIcon(icons.recorder.recording)} />
        <label
          label={bind(screenrecord, "timer").as((time) => {
            const sec = time % 60;
            const min = Math.floor(time / 60);
            return `${min}:${sec < 10 ? "0" + sec : sec}`;
          })}
        />
      </box>
    </button>
  );
}
