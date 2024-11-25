import { getIcon, icons } from "@assets/icons";
import Brightness from "@services/brightness";
import { bind } from "astal";

export default function () {
  const brightness = Brightness.get_default();

  return (
    <box className="slider-box horizontal">
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
