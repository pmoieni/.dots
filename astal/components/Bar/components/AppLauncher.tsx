import { getIcon, icons } from "@assets/icons";
import { App } from "astal/gtk3";

export default function AppLauncher() {
  return (
    <button
      onClicked={() => App.toggle_window("applauncher")}
      className="bar-applauncher"
    >
      <icon icon={getIcon(icons.ui.search)} />
    </button>
  );
}
