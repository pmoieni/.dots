import { getIcon, icons } from "@assets/icons"
import Brightness from "@services/brightness"
import { bind } from "astal"
import options from "options"

export default function () {
    const brightness = Brightness.get_default()

    return (
        <box spacing={options.theme.spacing()} className="slider-box">
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
    )
}
