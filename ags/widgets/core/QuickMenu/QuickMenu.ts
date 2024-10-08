import type Gtk from "gi://Gtk?version=3.0";
import { Header } from "./widgets/Header";
import { Audio, Microphone, SinkSelector, AppMixer } from "./widgets/Volume";
import { Brightness } from "./widgets/Brightness";
import { NetworkToggle, WifiSelection } from "./widgets/Network";
import { BluetoothToggle, BluetoothDevices } from "./widgets/Bluetooth";
import { DND } from "./widgets/DND";
import { DarkModeToggle } from "./widgets/DarkMode";
import options from "options";
import { ScreenRecordToggle } from "./widgets/Recorder";
import PopupWindow from "widgets/shared/PopupWindow";

const { bar, quickmenu } = options.widgets;
const layout = Utils.derive(
    [bar.position, quickmenu.position],
    (bar, qs) => `${bar}-${qs}` as const
);

const Row = (
    toggles: Array<() => Gtk.Widget> = [],
    menus: Array<() => Gtk.Widget> = []
) =>
    Widget.Box({
        vertical: true,
        children: [
            Widget.Box({
                homogeneous: true,
                class_name: "row horizontal",
                children: toggles.map((w) => w()),
            }),
            ...menus.map((w) => w()),
        ],
    });

const Settings = () =>
    Widget.Box({
        vertical: true,
        class_name: "quickmenu vertical",
        css: quickmenu.width.bind().as((w) => `min-width: ${w}px;`),
        children: [
            Header(),
            Widget.Box({
                class_name: "sliders-box vertical",
                vertical: true,
                children: [
                    Row([Audio], [SinkSelector, AppMixer]),
                    Microphone(),
                    Brightness(),
                ],
            }),
            Row(
                [NetworkToggle, BluetoothToggle],
                [WifiSelection, BluetoothDevices]
            ),
            Row([ScreenRecordToggle, DarkModeToggle]),
            Row([DND]),
        ],
    });

export default () =>
    PopupWindow({
        name: "quickmenu",
        setup: (w) =>
            w.keybind(["SUPER"], "Q", () => {
                App.toggleWindow("quickmenu");
            }),
        keymode: "on-demand",
        exclusivity: "exclusive",
        transition: bar.position
            .bind()
            .as((pos) => (pos === "top" ? "slide_down" : "slide_up")),
        layout: layout.value,
        child: Settings(),
    });
