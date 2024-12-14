import { bind } from "astal"
import Hyprland from "gi://AstalHyprland"

export default function Workspaces() {
    const hypr = Hyprland.get_default()

    const Workspace = (ws: Hyprland.Workspace) => (
        <button
            className={bind(hypr, "focusedWorkspace").as((fw) =>
                ws.id === fw.id ? "focused" : ""
            )}
            onClicked={() => ws.focus()}
        >
            {ws.id}
        </button>
    )

    return (
        <box className="bar-workspaces">
            {bind(hypr, "workspaces").as((wss) =>
                wss.sort((a, b) => a.id - b.id).map((ws) => Workspace(ws))
            )}
        </box>
    )
}
