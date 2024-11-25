import { getIcon, icons } from "@assets/icons";
import Brightness from "@services/brightness";
import { bind } from "astal";

export default function () {
  const brightness = Brightness.get_default();

  return (
    <box className="slider-box horizontal">
      <button>
        <icon icon={getIcon(icons.brightness.screen)} />
      </button>
      <slider
        hexpand
        value={bind(brightness, "screen")}
        min={0.2}
        max={1}
        onDragged={({ value }) => (brightness.screen = value)}
      ></slider>
    </box>
  );
}
