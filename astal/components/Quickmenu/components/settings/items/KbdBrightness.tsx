import { getIcon, icons } from "@assets/icons";
import Brightness from "@services/brightness";
import { bind } from "astal";
import options from "options";

export default function () {
  const brightness = Brightness.get_default();

  return (
    <box spacing={options.theme.spacing()} className="slider-box">
      <button>
        <icon icon={getIcon(icons.brightness.keyboard)} />
      </button>
      <slider
        hexpand
        value={bind(brightness, "kbd")}
        min={0}
        max={3}
        step={1}
        onDragged={({ value }) => (brightness.kbd = value)}
      ></slider>
    </box>
  );
}
