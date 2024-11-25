import { GLib } from "astal";
import { Astal } from "astal/gtk3";
import Network from "gi://AstalNetwork";

export const icons = {
  ui: {
    missing: "image-missing-symbolic",
    executable: "icon-binary-symbolic",
    notification: "icon-bell-symbolic",
    video: "icon-video-symbolic",
    audio: "icon-music-note-symbolic",
    terminal: "icon-terminal-symbolic",
    close: "icon-x-circle-symbolic",
    colorpicker: "icon-eyedropper-symbolic",
    info: "icon-info-symbolic",
    link: "icon-link-symbolic",
    lock: "icon-lock-symbolic",
    menu: "icon-list-symbolic",
    refresh: "icon-arrows-clockwise-symbolic",
    search: "icon-magnifying-glass-symbolic",
    settings: "icon-gear-symbolic",
    themes: "icon-palette-symbolic",
    tick: "icon-check-symbolic",
    time: "icon-clock-symbolic",
    music: "icon-music-note-symbolic",
    toolbars: "icon-app-window-symbolic",
    warning: "icon-warning-symbolic",
  },
  arrow: {
    right: "icon-arrow-right-symbolic",
    left: "icon-arrow-left-symbolic",
    down: "icon-arrow-down-symbolic",
    up: "icon-arrow-up-symbolic",
  },
  media: {
    shuffle: "icon-shuffle-symbolic",
    repeat: "icon-repeat-symbolic",
    repeat_once: "icon-repeat-once-symbolic",
    graphicsCards: "icon-graphics-card-symbolic",
    mic: {
      muted: "icon-microphone-slash-symbolic",
      low: "icon-microphone-symbolic",
      medium: "icon-microphone-symbolic",
      high: "icon-microphone-symbolic",
    },
    speaker: {
      muted: "icon-speaker-x-symbolic",
      low: "icon-speaker-none-symbolic",
      medium: "icon-speaker-low-symbolic",
      high: "icon-speaker-high-symbolic",
      overamplified: "icon-speaker-high-symbolic",
    },
    headset: "icon-headphones-symbolic",
    card: "icon-graphics-card-symbolic",
    mixer: "icon-equalizer-symbolic",
  },
  wired: "icon-wired-symbolic",
  wifi: {
    disconnected: "icon-wifi-slash-symbolic",
    none: "icon-wifi-none-symbolic",
    low: "icon-wifi-low-symbolic",
    medium: "icon-wifi-medium-symbolic",
    high: "icon-wifi-high-symbolic",
  },
  battery: {
    charging: "icon-battery-charging-symbolic",
    warning: "icon-battery-warning-symbolic",
    low: "icon-battery-low-symbolic",
    medium: "icon-battery-medium-symbolic",
    high: "icon-battery-high-symbolic",
    full: "icon-battery-full-symbolic",
  },
  bluetooth: {
    enabled: "icon-bluetooth-symbolic",
    disabled: "icon-bluetooth-slash-symbolic",
  },
  brightness: {
    indicator: "icon-sun-symbolic",
    keyboard: "keyboard-brightness-symbolic",
    screen: "display-brightness-symbolic",
  },
  powermenu: {
    lock: "icon-lock-symbolic",
    reboot: "icon-arrow-clockwise-symbolic",
    logout: "icon-sign-out-symbolic",
    shutdown: "icon-power-symbolic",
    sleep: "icon-moon-symbolic",
  },
  recorder: {
    recording: "icon-record-symbolic",
  },
  notifications: {
    noisy: "icon-bell-symbolic",
    silent: "icon-bell-slash-symbolic",
    message: "icon-chat-symbolic",
  },
  trash: {
    full: "icon-trash-symbolic",
    empty: "icon-trash-symbolic",
  },
  mpris: {
    shuffle: {
      enabled: "icon-shuffle-symbolic",
      disabled: "icon-arrows-down-up-symbolic",
    },
    loop: {
      none: "media-playlist-repeat-symbolic",
      track: "icon-music-note-symbolic",
      playlist: "icon-playlist-symbolic",
    },
    playing: "icon-pause-symbolic",
    paused: "icon-play-symbolic",
    stopped: "icon-stop-symbolic",
    prev: "icon-skip-back-symbolic",
    next: "icon-skip-forward-symbolic",
  },
  system: {
    cpu: "icon-cpu-symbolic",
    ram: "icon-memory-symbolic",
    temp: "icon-thermometer-symbolic",
  },
  theme: {
    dark: "icon-moon-symbolic",
    light: "icon-sun-symbolic",
  },
};

export function getIcon(name: string | null, fallback = icons.ui.missing) {
  if (!name) return fallback || "";

  if (GLib.file_test(name, GLib.FileTest.EXISTS)) return name;

  const icon = name;
  if (Astal.Icon.lookup_icon(icon)) return icon;

  print(`no icon substitute "${icon}" for "${name}", fallback: "${fallback}"`);
  return fallback;
}

export function getNetworkIcon(
  connectivity: Network.Connectivity,
  wifi?: Network.Wifi,
) {
  if (
    [Network.Connectivity.LIMITED, Network.Connectivity.FULL].includes(
      connectivity,
    )
  ) {
    if (wifi) {
      const { none, low, medium, high } = icons.wifi;
      const cons = [
        [60, high],
        [40, medium],
        [20, low],
        [0, none],
      ] as const;

      return (
        cons.find(([n]) => n <= (wifi as Network.Wifi).strength)?.[1] || none
      );
    }

    return icons.wired;
  }

  return icons.wifi.disconnected;
}

export function getSpeakerIcon(volume: number, mute: boolean) {
  const { muted, low, medium, high, overamplified } = icons.media.speaker;
  const cons = [
    [101, overamplified],
    [67, high],
    [34, medium],
    [1, low],
    [0, muted],
  ] as const;

  if (mute) return muted;

  return cons.find(([n]) => n <= volume * 100)?.[1] || "";
}

export function getMicIcon(volume: number, mute: boolean) {
  const { muted, low, medium, high } = icons.media.mic;
  const cons = [
    [67, high],
    [34, medium],
    [1, low],
    [0, muted],
  ] as const;

  if (mute) return muted;

  return cons.find(([n]) => n <= volume * 100)?.[1] || "";
}
