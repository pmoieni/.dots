import { Gio, GLib } from "astal";
import { App } from "astal/gtk3";
import { scrimWindowNames } from "./vars";
import Notifd from "gi://AstalNotifd";

export function dependencies(...packages: string[]) {
  for (const pkg of packages) {
    const result = GLib.find_program_in_path(pkg);
    if (!result) {
      return false;
    }
  }
  return true;
}

export function ensureDirectory(path: string) {
  if (!GLib.file_test(path, GLib.FileTest.EXISTS))
    Gio.File.new_for_path(path).make_directory_with_parents(null);
}

export const activePopupWindows = () => {
  return App.get_windows().filter((window) => {
    return scrimWindowNames.get().includes(window.name) && window.visible;
  });
};

export function toggleWindow(windowName: string) {
  const w = App.get_window(windowName);

  if (w) {
    if (w.visible) {
      w.visible = false;
      // if (windowName == "control-center") currentPage.set("main");
    } else {
      if (windowName == "notifications") {
        const notifications = Notifd.get_default().get_notifications();
        if (notifications.length == 0) return;
      }
      App.get_window("scrim")?.set_visible(true);
      w.visible = true;
    }
  }
}
