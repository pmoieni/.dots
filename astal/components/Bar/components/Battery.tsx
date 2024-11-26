import { icons } from "@assets/icons";
import { bind, Variable } from "astal";
import Battery from "gi://AstalBattery";
import options from "options";

export default () => {
  const bat = Battery.get_default();
  const charging = bind(bat, "charging");
  const warningLevel = bind(bat, "warningLevel");
  const percentage = bind(bat, "percentage");
  const icon = Variable.derive([charging, percentage], (ch, per) => {
    const { charging, warning, low, medium, high, full } = icons.battery;

    const cons = [
      [100, full],
      [60, high],
      [30, medium],
      [15, low],
      [0, warning],
    ] as const;

    return ch
      ? charging
      : cons.find(([n]) => n <= Math.floor(per * 100))?.[1] || "";
  });

  const css = Variable.derive([charging, warningLevel], (ch, wl) => {
    if (ch)
      return `background-color: ${options.battery.chargingBg.value}; color: #000000;`;

    switch (wl) {
      case Battery.WarningLevel.LOW:
        return `background-color: ${options.battery.warningBg.value}; color: #000000;`;
      case Battery.WarningLevel.CRITICIAL:
        return `background-color: ${options.battery.criticalBg.value}; color: #000000;`;
      default:
        return "";
    }
  });

  return (
    <box spacing={options.theme.spacing()} className="bar-battery" css={css()}>
      <icon icon={icon()} />
      <label label={percentage.as((p) => `${Math.floor(p * 100)}%`)} />
    </box>
  );
};
