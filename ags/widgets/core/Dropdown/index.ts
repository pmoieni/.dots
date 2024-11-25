import options from "options";
import PopupWindow from "widgets/shared/PopupWindow";

export default (monitor = 0) => {
    const box = Widget.CenterBox({
        hexpand: true,
        startWidget: Widget.Box({
            child: Widget.Label({
                label: "Dropdown",
            }),
        }),
        centerWidget: Widget.Box({
            child: Widget.Label({
                label: "Dropdown",
            }),
        }),
        endWidget: Widget.Box({
            child: Widget.Label({
                label: "Dropdown",
            }),
        }),
    });

    const window = PopupWindow({
        monitor,
        name: "dropdown",
        className: "dropdown",
        exclusivity: "normal",
        transition: options.widgets.bar.position
            .bind()
            .as((pos) => (pos === "top" ? "slide_down" : "slide_up")),
        hexpand: true,
        child: box,
    });

    return window;
};
