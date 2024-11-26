import Network from "./Network";
import Mic from "./Mic";
import Speaker from "./Speaker";
import { toggleWindow } from "@lib/utils";

export default function () {
  return (
    <button
      className="bar-quickmenu"
      onClicked={() => toggleWindow("quickmenu")}
    >
      <box className="horizontal">
        <Network />
        <Speaker />
        <Mic />
      </box>
    </button>
  );
}
