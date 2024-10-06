import icons from "lib/icons";
import options from "options";

const battery = await Service.import("battery");
const { low: batteryLow } = options.widgets.bar.battery;

const Indicator = () =>
    Widget.Icon({
        setup: (self) =>
            self.hook(battery, () => {
                const { charging, warning, low, medium, high, full } =
                    icons.battery;

                const cons = [
                    [100, full],
                    [60, high],
                    [30, medium],
                    [batteryLow.value, low],
                    [0, warning],
                ] as const;

                self.icon = battery.charging
                    ? charging
                    : cons.find(([n]) => n <= battery.percent)?.[1] || "";
            }),
    });

export default () =>
    Widget.Button({
        className: "bar-battery",
        visible: battery.bind("available"),
        child: Widget.Box({
            children: [
                Indicator(),
                Widget.Label({
                    label: battery.bind("percent").as((p) => `${p}%`),
                }),
            ],
        }),
        setup: (self) =>
            self.hook(battery, (w) => {
                w.toggleClassName(
                    "charging",
                    battery.charging || battery.charged
                );
                w.toggleClassName("low", battery.percent < batteryLow.value);
            }),
    });
