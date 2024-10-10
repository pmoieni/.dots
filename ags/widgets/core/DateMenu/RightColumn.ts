import icons from "lib/icons";
import { cpu, ram } from "lib/variables";
import { MediaControl } from "widgets/shared/MediaControl";

const Stats = () =>
    Widget.CenterBox({
        class_name: "stats horizontal",
        startWidget: Widget.Box({
            class_name: "stats-box vertical",
            vertical: true,
            children: [
                Widget.Box({
                    class_name: "progress-box",
                    child: Widget.CircularProgress({
                        class_name: "progress",
                        expand: true,
                        value: cpu.bind(),
                        child: Widget.Icon(icons.ui.cpu),
                    }),
                }),
                Widget.Box({
                    class_name: "info-box horizontal",
                    children: [
                        Widget.Label({
                            expand: true,
                            class_name: "label",
                            label: "CPU",
                        }),
                        Widget.Label({
                            expand: true,
                            label: cpu
                                .bind()
                                .as((v) => Math.ceil(v * 100).toString() + "%"),
                        }),
                    ],
                }),
            ],
        }),
        endWidget: Widget.Box({
            class_name: "stats-box vertical",
            vertical: true,
            children: [
                Widget.Box({
                    class_name: "progress-box",
                    child: Widget.CircularProgress({
                        class_name: "progress",
                        expand: true,
                        value: ram.bind(),
                        child: Widget.Icon(icons.ui.ram),
                    }),
                }),
                Widget.Box({
                    class_name: "info-box horizontal",
                    children: [
                        Widget.Label({
                            expand: true,
                            class_name: "label",
                            label: "RAM",
                        }),
                        Widget.Label({
                            expand: true,
                            label: ram
                                .bind()
                                .as((v) => Math.ceil(v * 100).toString() + "%"),
                        }),
                    ],
                }),
            ],
        }),
    });

export default () =>
    Widget.Box({
        vertical: true,
        class_name: "right-column vertical",
        children: [
            Widget.Box({
                class_name: "calendar",
                child: Widget.Calendar({
                    hexpand: true,
                    hpack: "center",
                }),
            }),
            MediaControl(),
            Stats(),
        ],
    });
