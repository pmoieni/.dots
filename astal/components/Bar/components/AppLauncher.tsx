import { getIcon, icons } from "@assets/icons"
import { toggleWindow } from "@lib/utils"

export default function AppLauncher() {
    return (
        <button
            onClicked={() => toggleWindow("applauncher")}
            className="bar-applauncher"
        >
            <icon icon={getIcon(icons.ui.search)} />
        </button>
    )
}
