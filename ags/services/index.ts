import gtk from "./gtk";
import battery from "./battery";
import hyprland from "./hyprland";
import notifications from "./notifications";
import matugen from "./matugen";

export async function init() {
    try {
        gtk();
        battery();
        hyprland();
        notifications();
        matugen();
    } catch (error) {
        logError(error);
    }
}
