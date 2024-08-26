import gtk from "./gtk";
import battery from "./battery";
import hyprland from "./hyprland";
import notifications from "./notifications";
import wallpaper from "./wallpaper";

export async function init() {
    try {
        gtk();
        battery();
        hyprland();
        notifications();
        wallpaper;
    } catch (error) {
        logError(error);
    }
}
