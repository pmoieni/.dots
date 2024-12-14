import KbdBrightness from "../items/KbdBrightness"
import Network from "../items/Network"
import ScreenBrightness from "../items/ScreenBrightness"
import { Widget } from "astal/gtk3"
import Speaker from "../items/Speaker"
import Mic from "../items/Mic"
import DND from "../items/DND"
import Bluetooth from "../items/Bluetooth"
import Recorder from "../items/Recorder"
import options from "options"

function Row({ className, ...props }: Widget.BoxProps) {
    return (
        <box
            spacing={options.theme.spacing()}
            homogeneous
            {...props}
            className={`${className} row`}
        >
            {props.children}
        </box>
    )
}

export default function () {
    return (
        <box
            spacing={options.theme.spacing()}
            name="main"
            className="main"
            vertical
        >
            <Row>
                {Network()}
                <Bluetooth />
                <DND />
                <Recorder />
            </Row>
            <Row vertical className="sliders-box">
                <Speaker />
                <Mic />
            </Row>
            <Row vertical className="sliders-box">
                <ScreenBrightness />
                <KbdBrightness />
            </Row>
        </box>
    )
}
