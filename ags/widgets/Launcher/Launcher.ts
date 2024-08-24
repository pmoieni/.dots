import icons from "lib/icons";
import options from "options";
import * as AppLauncher from "./AppLauncher";
import * as ShLauncher from "./ShLauncher";
import PopupWindow, { Padding } from "widgets/PopupWindow";

const { width, margin } = options.widgets.launcher;

function Launcher() {
    const favs = AppLauncher.Favorites();
    const applauncher = AppLauncher.Launcher();
    const sh = ShLauncher.ShRun();
    const shicon = ShLauncher.Icon();

    const entry = Widget.Entry({
        hexpand: true,
        primary_icon_name: icons.ui.search,
        on_accept: ({ text }) => {
            if (text?.startsWith(">")) sh.run(text.substring(1));
            else applauncher.launchFirst();

            App.toggleWindow("launcher");
            entry.text = "";
        },
        on_change: ({ text }) => {
            text ||= "";
            favs.reveal_child = text === "";

            if (text.startsWith(">")) sh.filter(text.substring(1));
            else sh.filter("");

            applauncher.filter(text);
        },
    });

    function focus() {
        entry.text = "Search";
        entry.set_position(-1);
        entry.select_region(0, -1);
        entry.grab_focus();
        favs.reveal_child = true;
    }

    const layout = Widget.Box({
        css: width.bind().as((v) => `min-width: ${v}pt;`),
        class_name: "launcher",
        vertical: true,
        vpack: "start",
        setup: (self) =>
            self.hook(App, (_, win, visible) => {
                if (win !== "launcher") return;

                entry.text = "";
                if (visible) focus();
            }),
        children: [Widget.Box([entry, shicon]), favs, applauncher, sh],
    });

    return Widget.Box(
        Padding("applauncher", {
            css: margin.bind().as((v) => `min-height: ${v}pt;`),
            vexpand: false,
        }),
        layout
    );
}

export default () =>
    PopupWindow({
        name: "launcher",
        layout: "center",
        child: Launcher(),
    });
