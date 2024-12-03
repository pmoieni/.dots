import Battery from "gi://AstalBattery";
import { bind, execAsync } from "astal";

export default function () {
  const battery = Battery.get_default();
  battery.connect("notify::charging", (bat: Battery.Device) => {
    if (bat.charging) {
      execAsync([
        "notify-send",
        "-a",
        "Battery",
        "-t",
        "5000",
        "Charger plugged in",
        "battery is charging.",
      ]);
    }
  });

  battery.connect("notify::warning-level", (bat: Battery.Device) => {
    switch (bat.warningLevel) {
      case Battery.WarningLevel.LOW:
        execAsync([
          "notify-send",
          "-a",
          "Battery",
          "-t",
          "10000",
          "Battery low",
          "consider plugging in the charger.",
        ]);
        break;
      case Battery.WarningLevel.CRITICIAL:
        execAsync([
          "notify-send",
          "-a",
          "Battery",
          "-u",
          "critical",
          "Critical battery alert",
          "consider plugging in the charger.",
        ]);
        break;
    }
  });
}
