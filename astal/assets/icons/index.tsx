import { GLib } from "astal";
import { Astal } from "astal/gtk3";

export const icons = {
  bluetooth: {
    enabled: "bluetooth-active-symbolic",
    disabled: "bluetooth-disabled-symbolic",
  },
  powermenu: {
    shutdown: "system-shutdown-symbolic",
    reboot: "system-reboot-symbolic",
    sleep: "weather-clear-night-symbolic",
    logout: "system-log-out-symbolic",
  },
  ui: {
    missing: "image-missing-symbolic",
    executable: "icon-binary-symbolic",
    notification: "icon-bell-symbolic",
    video: "icon-video-symbolic",
    audio: "icon-music-note-symbolic",
    terminal: "icon-terminal-symbolic",
    close: "window-close-symbolic",
    colorpicker: "icon-eyedropper-symbolic",
    info: "icon-info-symbolic",
    link: "icon-link-symbolic",
    lock: "icon-lock-symbolic",
    menu: "icon-list-symbolic",
    refresh: "icon-arrows-clockwise-symbolic",
    search: "system-search-symbolic",
    settings: "icon-gear-symbolic",
    themes: "icon-palette-symbolic",
    tick: "icon-check-symbolic",
    time: "icon-clock-symbolic",
    music: "icon-music-note-symbolic",
    toolbars: "icon-app-window-symbolic",
    warning: "icon-warning-symbolic",
  },
  arrow: {
    right: "go-next-symbolic",
    left: "go-previous-symbolic",
    down: "go-down-symbolic",
    up: "go-up-symbolic",
  },
  brightness: {
    keyboard: "keyboard-brightness-symbolic",
    screen: "display-brightness-symbolic",
  },
  recorder: {
    recording: "media-record-symbolic",
  },
  // needs custom icons
  notifications: {
    noisy: "icon-bell-symbolic",
    silent: "icon-bell-slash-symbolic",
    message: "icon-chat-symbolic",
  },
  trash: {
    full: "user-trash-full-symbolic",
    empty: "user-trash-symbolic",
  },
  // use system icons
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
  // needs custom icons
  system: {
    cpu: "icon-cpu-symbolic",
    ram: "icon-memory-symbolic",
    temp: "icon-thermometer-symbolic",
  },
  // use system icons
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
