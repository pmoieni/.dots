import options from "options";
import icons from "../lib/icons";

export default async function init() {
    const bat = await Service.import("battery");
    const { battery } = options.widgets.bar;

    bat.connect("notify::charging", ({ charging }) => {
        if (charging) {
            Utils.notify({
                summary: "Charger plugged in.",
                body: "battery is charging.",
                iconName: icons.battery.charging,
                urgency: "normal",
                timeout: 5000,
            });
        }
    });

    bat.connect("notify::percent", ({ percent, charging }) => {
        const low = battery.low.value;

        if ((percent === low || percent === Math.floor(low / 2)) && !charging) {
            Utils.notify({
                summary: "Battery is running low!",
                body: "plug in the charger.",
                iconName: icons.battery.warning,
                urgency: "critical",
            });
        }
    });
}
