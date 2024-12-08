import { mkOptions, opt } from "@lib/option";
import { Index, Market, Resolution } from "@services/wallpaper";

const options = mkOptions(OPTIONS, {
  wallpaper: {
    resolution: opt<Resolution>("UHD"),
    market: opt<Market>("en-US"),
    idx: opt<Index>(0),
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
    },
    border: {
      width: opt(2),
      opacity: opt(95),
    },
    blur: opt(35),
    opacity: opt(95),
    shadows: opt(false),
    padding: opt(5),
    spacing: opt(5),
    radius: opt(8),
    scheme: opt<"dark" | "light">("dark"),
  },
  transition: opt(300),
  font: {
    size: opt(11),
    name: opt("Ubuntu Nerd Font Regular"),
  },
  battery: {
    chargingBg: opt("#00D787"),
    warningBg: opt("#d79e00"),
    criticalBg: opt("#d70000"),
  },
  widgets: {
    bar: {
      position: opt<"top" | "bottom">("bottom"),
      autohide: opt(true),
      dock: opt(true),
      systray: {
        ignore: opt(["spotify-client"]),
      },
      media: {
        length: opt(40),
      },
    },
    applauncher: {
      width: opt(500),
      apps: {
        max: opt(8),
      },
    },
    powermenu: {
      lock: opt("loginctl lock-session"),
      sleep: opt("systemctl suspend"),
      reboot: opt("systemctl reboot"),
      logout: opt("hyprctl dispatch exit"),
      shutdown: opt("systemctl poweroff"),
    },
    quickmenu: {
      width: opt(400),
      position: opt<"left" | "right">("right"),
      networkSettings: opt("alacritty -e nmtui"),
    },
    notification: {
      width: opt(440),
      position: opt<Array<"top" | "bottom" | "left" | "right">>(["top", "top"]),
      blacklist: opt(["Spotify"]),
    },
  },
  hyprland: {
    gaps: opt(1),
  },
  system: {
    fetchInterval: {
      value: 2000,
    },
  },
});

export default options;
