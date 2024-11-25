import { App } from "astal/gtk3";
import Network from "./Network";
import Mic from "./Mic";
import Speaker from "./Speaker";

export default function () {
  return (
    <button
      className="bar-quickmenu"
      onClicked={() => App.toggle_window("quickmenu")}
    >
      <box className="horizontal">
        <Network />
        <Speaker />
        <Mic />
      </box>
    </button>
  );
}
