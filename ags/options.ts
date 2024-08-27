import { opt, mkOptions } from "lib/option";

const options = mkOptions(OPTIONS, {
    wallpaper: {
        resolution: opt<import("services/wallpaper").Resolution>(1920),
        market: opt<import("services/wallpaper").Market>("random"),
    },
    theme: {
        dark: {
            primary: {
                bg: opt("#c4a7e7"),
                fg: opt("#191724"),
            },
            error: {
                bg: opt("#eb6f92"),
                fg: opt("#191724"),
            },
            bg: opt("#191724"),
            fg: opt("#e0def4"),
            widget: opt("#e0def4"),
            border: opt("#e0def4"),
        },
        light: {
            primary: {
                bg: opt("#907aa9"),
                fg: opt("#faf4ed"),
            },
            error: {
                bg: opt("#b4637a"),
                fg: opt("#faf4ed"),
            },
            bg: opt("#faf4ed"),
            fg: opt("#575279"),
            widget: opt("#575279"),
            border: opt("#575279"),
        },
        border: {
            width: opt(2),
            opacity: opt(96),
        },
        blur: opt(1),
        shadows: opt(false),
        padding: opt(5),
        spacing: opt(12),
        radius: opt(8),
        scheme: opt<"dark" | "light">("dark"),
    },
    widget: { opacity: opt(90) },
    border: {
        width: opt(2),
        opacity: opt(95),
    },
    blur: opt(24),
    shadows: opt(false),
    padding: opt(8),
    spacing: opt(8),
    radius: opt(16),
    transition: opt(200),
    font: {
        size: opt(11),
        name: opt("Ubuntu Nerd Font"),
    },
    widgets: {
        bar: {
            position: opt<"top" | "bottom">("top"),
            battery: {
                low: opt(20),
            },
            workspaces: {
                workspaces: opt(5),
            },
            systray: {
                ignore: opt(["spotify-client"]),
            },
            media: {
                preferred: opt("spotify"),
                direction: opt<"left" | "right">("right"),
                format: opt("{artists} - {title}"),
                length: opt(40),
            },
        },
        launcher: {
            width: opt(0),
            margin: opt(80),
            sh: {
                max: opt(16),
                prefix: "",
            },
            apps: {
                iconSize: opt(55),
                max: opt(4),
                favorites: opt([
                    ["Firefox", "Brave", "Tor Browser", "Telegram Desktop"],
                    ["alacritty", "dolphin", "Obs studio", "Outline VPN"],
                ]),
            },
        },
        workspaces: {
            scale: opt(12),
            count: opt(5),
        },
        powermenu: {
            lock: opt("loginctl lock-session"),
            sleep: opt("systemctl suspend"),
            reboot: opt("systemctl reboot"),
            logout: opt("hyprctl dispatch exit"),
            shutdown: opt("systemctl poweroff"),
            labels: opt(true),
        },
        quickmenu: {
            width: opt(400),
            position: opt<"left" | "center" | "right">("right"),
            media: {
                coverSize: opt(100),
            },
            networkSettings: opt("alacritty -e nmtui"),
        },
        datemenu: {
            position: opt<"left" | "center" | "right">("center"),
        },
        notifications: {
            width: opt(440),
            position: opt<Array<"top" | "bottom" | "left" | "right">>([
                "top",
                "right",
            ]),
            blacklist: opt(["Spotify"]),
        },
    },
    hyprland: {
        gaps: opt(1),
        inactiveBorder: opt("#282828"),
        gapsWhenOnly: opt(false),
    },
});

globalThis["options"] = options;
export default options;
