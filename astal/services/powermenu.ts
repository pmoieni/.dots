import { GObject, property, register } from "astal";
import options from "../options";
import { App } from "astal/gtk3";
import { toggleWindow } from "@lib/utils";

export type PowerMenuAction = "sleep" | "reboot" | "logout" | "shutdown";

const { sleep, reboot, logout, shutdown } = options.widgets.powermenu;

@register({ GTypeName: "Powermenu" })
export default class Powermenu extends GObject.Object {
  static instance: Powermenu;
  static get_default() {
    if (!this.instance) this.instance = new Powermenu();

    return this.instance;
  }

  #title = "";
  #cmd = "";

  @property(String)
  get title() {
    return this.#title;
  }

  @property(String)
  get cmd() {
    return this.#cmd;
  }

  action(action: PowerMenuAction) {
    [this.#cmd, this.#title] = {
      sleep: [sleep.value, "Sleep"],
      reboot: [reboot.value, "Reboot"],
      logout: [logout.value, "Log Out"],
      shutdown: [shutdown.value, "Shutdown"],
    }[action];

    this.notify("cmd");
    this.notify("title");
    toggleWindow("applauncher");
    toggleWindow("verification");
  }

  constructor() {
    super();
  }
}
