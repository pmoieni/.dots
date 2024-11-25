import { App, Astal, Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { type Subscribable } from "astal/binding";
import { Variable, bind, timeout } from "astal";
import Notification from "./Notification";

// see comment below in constructor
const TIMEOUT_DELAY = 5000;

// The purpose if this class is to replace Variable<Array<Widget>>
// with a Map<number, Widget> type in order to track notification widgets
// by their id, while making it conviniently bindable as an array
class NotifiationMap implements Subscribable {
  // the underlying map to keep track of id widget pairs
  private map: Map<number, Gtk.Widget> = new Map();

  // it makes sense to use a Variable under the hood and use its
  // reactivity implementation instead of keeping track of subscribers ourselves
  private var: Variable<Array<Gtk.Widget>> = Variable([]);

  // notify subscribers to rerender when state changes
  private notifiy() {
    this.var.set([...this.map.values()].reverse());
  }

  constructor() {
    const notifd = Notifd.get_default();

    /**
     * uncomment this if you want to
     * ignore timeout by senders and enforce our own timeout
     * note that if the notification has any actions
     * they might not work, since the sender already treats them as resolved
     */
    // notifd.ignoreTimeout = true

    notifd.connect("notified", (_, id) => {
      this.set(
        id,
        Notification({
          notification: notifd.get_notification(id)!,
          onHoverLost: () => this.delete(id),
          setup: () =>
            timeout(TIMEOUT_DELAY, () => {
              this.delete(id);
            }),
        }),
      );
    });

    // notifications can be closed by the outside before
    // any user input, which have to be handled too
    notifd.connect("resolved", (_, id) => {
      this.delete(id);
    });
  }

  private set(key: number, value: Gtk.Widget) {
    // in case of replacecment destroy previous widget
    this.map.get(key)?.destroy();
    this.map.set(key, value);
    this.notifiy();
  }

  private delete(key: number) {
    this.map.get(key)?.destroy();
    this.map.delete(key);
    this.notifiy();
  }

  // needed by the Subscribable interface
  get() {
    return this.var.get();
  }

  // needed by the Subscribable interface
  subscribe(callback: (list: Array<Gtk.Widget>) => void) {
    return this.var.subscribe(callback);
  }
}

export default function NotificationPopups(monitor: number) {
  const notifs = new NotifiationMap();

  return (
    <window
      name="notification-popups"
      namespace="notification-popups"
      application={App}
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT}
    >
      <box vertical>{bind(notifs)}</box>
    </window>
  );
}
