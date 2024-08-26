import gtk from "./gtk";
import battery from "./battery";
import hyprland from "./hyprland";
import notifications from "./notifications";

export async function init() {
    try {
        gtk();
        battery();
        hyprland();
        notifications();
    } catch (error) {
        logError(error);
    }
}
