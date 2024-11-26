import { Gio, GLib } from "astal";
import { App } from "astal/gtk3";
import { scrimWindowNames } from "./vars";

export type Ref<T> = { ref?: T };

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
  const windows = scrimWindowNames.get();

  return App.get_windows().filter((window) => {
    return windows.includes(window.name) && window.visible;
  });
};

export function toggleWindow(windowName: string) {
  const w = App.get_window(windowName);
  if (!w) return;

  if (w.visible) {
    w.visible = false;
  } else {
    App.get_window("scrim")?.set_visible(true);
    w.visible = true;
  }
}
