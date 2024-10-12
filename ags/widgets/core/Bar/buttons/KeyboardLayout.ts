const hyprland = await Service.import("hyprland");

const keyboard_layout = Variable("none");
hyprland.connect("keyboard-layout", (_hyprland, _keyboardname, layout) => {
    keyboard_layout.setValue(layout.trim().toLowerCase().substr(0, 2));
});

export default () =>
    Widget.Label({
        className: "bar-keyboard_layout",
        visible: keyboard_layout.bind().as((l) => l !== "none"),
        label: keyboard_layout.bind(),
    });
