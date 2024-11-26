import { bind, Variable } from "astal";
import Battery from "gi://AstalBattery";
import options from "options";

export default () => {
  const bat = Battery.get_default();
  const charging = bind(bat, "charging");
  const warningLevel = bind(bat, "warningLevel");
  const percentage = bind(bat, "percentage");

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
      <icon icon={bind(bat, "iconName")} />
      <label label={percentage.as((p) => `${Math.floor(p * 100)}%`)} />
    </box>
  );
};
