import KbdBrightness from "../items/KbdBrightness";
import Network from "../items/Network";
import ScreenBrightness from "../items/ScreenBrightness";
import { Widget } from "astal/gtk3";
import Speaker from "../items/Speaker";
import Mic from "../items/Mic";
import DND from "../items/DND";
import Bluetooth from "../items/Bluetooth";

function Row({ className, vertical, ...props }: Widget.BoxProps) {
  return (
    <box
      homogeneous
      vertical={vertical}
      {...props}
      className={`${className} row ${vertical ? "vertical" : "horizontal"}`}
    >
      {props.children}
    </box>
  );
}

export default function () {
  return (
    <box name="main" className="main vertical" vertical>
      <Row>
        {Network()}
        <Bluetooth />
        <DND />
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
  );
}
