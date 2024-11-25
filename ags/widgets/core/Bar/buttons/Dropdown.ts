import icons from "lib/icons";

export default () =>
    Widget.Button({
        className: "bar-dropdown",
        onClicked: () => App.toggleWindow("dropdown"),
        child: Widget.Icon(icons.ui.menu),
    });
