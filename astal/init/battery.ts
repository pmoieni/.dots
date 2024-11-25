import Battery from "gi://AstalBattery";
import { bind, execAsync } from "astal";
import { icons } from "@assets/icons";

export default function () {
  const battery = Battery.get_default();
  bind(battery, "charging").as(async (ch) => {
    if (ch) {
      await execAsync([
        "notify-send",
        "-a",
        "Battery",
        "-i",
        icons.battery.charging,
        "-t",
        "5000",
        "Charger plugged in",
        "battery is charging.",
      ]);
    }
  });

  bind(battery, "warningLevel").as(async (wl) => {
    switch (wl) {
      case Battery.WarningLevel.LOW:
        await execAsync([
          "notify-send",
          "-a",
          "Battery",
          "-i",
          icons.battery.low,
          "-t",
          "10000",
          "Battery low",
          "consider plugging in the charger.",
        ]);
        break;
      case Battery.WarningLevel.CRITICIAL:
        await execAsync([
          "notify-send",
          "-a",
          "Battery",
          "-i",
          icons.battery.warning,
          "-u",
          "critical",
          "Critical battery alert",
          "consider plugging in the charger.",
        ]);
        break;
    }
  });
}
