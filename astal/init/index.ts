import battery from "./battery"
import hyprland from "./hyprland"
import matugen from "./matugen"
import style from "./style"

export function init() {
    try {
        hyprland()
        style()
        matugen()
        battery()
    } catch (error) {
        logError(error)
    }
}
