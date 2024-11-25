import Apps from "gi://AstalApps";
import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { Variable } from "astal";
import { getIcon, icons } from "@assets/icons";
import PopupWindow from "@widgets/PopupWindow";
import options from "options";

const {
  width,
  apps: { max },
} = options.widgets.applauncher;

function hide() {
  App.get_window("applauncher")!.hide();
}

function AppButton({ app }: { app: Apps.Application }) {
  return (
    <button
      className="app-button"
      onClicked={() => {
        hide();
        app.launch();
      }}
    >
      <box>
        <icon icon={app.iconName} />
        <box valign={Gtk.Align.CENTER} vertical>
          <label className="name" truncate xalign={0} label={app.name} />
          {app.description && (
            <label
              className="description"
              wrap
              xalign={0}
              label={app.description}
            />
          )}
        </box>
      </box>
    </button>
  );
}

export default function AppLauncher() {
  const { CENTER } = Gtk.Align;
  const apps = new Apps.Apps();

  const text = Variable("");
  const list = text((text) => apps.fuzzy_query(text).slice(0, max.value));
  const onEnter = () => {
    apps.fuzzy_query(text.get())?.[0].launch();
    hide();
  };

  const input = (
    <entry
      placeholderText="Search"
      text={text()}
      onChanged={(self) => text.set(self.text)}
      onActivate={onEnter}
    />
  );

  return (
    <PopupWindow
      visible={false}
      name="applauncher"
      namespace="applauncher"
      application={App}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.BOTTOM}
      exclusivity={Astal.Exclusivity.NORMAL}
      keymode={Astal.Keymode.ON_DEMAND}
      onShow={() => {
        text.set("");
        input.grab_focus();
      }}
      onKeyPressEvent={(self, event: Gdk.Event) => {
        if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
      }}
    >
      <box widthRequest={width.value} className="applauncher horizontal">
        <box className="controls" vertical>
          <box vexpand className="user"></box>
          <box className="powermenu" vertical>
            <button>
              <icon icon={getIcon(icons.powermenu.shutdown)} />
            </button>
            <button>
              <icon icon={getIcon(icons.powermenu.reboot)} />
            </button>
            <button>
              <icon icon={getIcon(icons.powermenu.sleep)} />
            </button>
            <button>
              <icon icon={getIcon(icons.powermenu.lock)} />
            </button>
          </box>
        </box>
        <box expand className="apps" vertical>
          {input}
          <box vertical>
            {list.as((list) => list.map((app) => <AppButton app={app} />))}
          </box>
          <box
            halign={CENTER}
            className="not-found"
            vertical
            visible={list.as((l) => l.length === 0)}
          >
            <icon icon="system-search-symbolic" />
            <label label="No match found" />
          </box>
        </box>
      </box>
    </PopupWindow>
  );
}
