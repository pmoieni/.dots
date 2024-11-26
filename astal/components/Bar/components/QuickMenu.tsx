import Network from "./Network";
import Mic from "./Mic";
import Speaker from "./Speaker";
import { toggleWindow } from "@lib/utils";
import options from "options";

export default function () {
  return (
    <button
      className="bar-quickmenu"
      onClicked={() => toggleWindow("quickmenu")}
    >
      <box spacing={options.theme.spacing()}>
        <Network />
        <Speaker />
        <Mic />
      </box>
    </button>
  );
}
