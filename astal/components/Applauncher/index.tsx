import Apps from "gi://AstalApps";
import { App, Astal, Gtk } from "astal/gtk3";
import { Variable } from "astal";
import { getIcon, icons } from "@assets/icons";
import PopupWindow from "@widgets/PopupWindow";
import options from "options";
import Powermenu from "@services/powermenu";

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

export default function () {
  const { CENTER } = Gtk.Align;
  const apps = new Apps.Apps({
    nameMultiplier: 15,
    entryMultiplier: 5,
    executableMultiplier: 1,
    descriptionMultiplier: 1,
    keywordsMultiplier: 0,
    minScore: 0.5,
  });

  const query = Variable("");
  const list = query((query) => apps.fuzzy_query(query).slice(0, max.value));
  const onEnter = () => {
    apps.fuzzy_query(query.get())?.[0].launch();
    hide();
  };

  const input = (
    <entry
      placeholderText="Search"
      text={query()}
      onChanged={(self) => query.set(self.text)}
      onActivate={onEnter}
    />
  );

  const powermenu = Powermenu.get_default();

  return (
    <PopupWindow
      name="applauncher"
      namespace="applauncher"
      anchor={options.widgets.bar
        .position()
        .as((p) =>
          p === "top"
            ? Astal.WindowAnchor.LEFT | Astal.WindowAnchor.TOP
            : Astal.WindowAnchor.LEFT | Astal.WindowAnchor.BOTTOM,
        )}
      exclusivity={Astal.Exclusivity.NORMAL}
      setup={(self) => {
        self.hook(self, "notify::visible", () => {
          if (!self.get_visible()) {
            query.set("");
          } else {
            input.grab_focus();
          }
        });
      }}
    >
      <box
        widthRequest={width.value}
        spacing={options.theme.spacing()}
        className="applauncher"
        vertical
      >
        <box expand className="apps" spacing={options.theme.spacing()} vertical>
          {input}
          <box vertical>
            {list.as((list) => list.map((app) => <AppButton app={app} />))}
          </box>
          <box
            halign={CENTER}
            className="placeholder"
            vertical
            visible={list.as((l) => l.length === 0)}
          >
            <icon icon="system-search-symbolic" />
            <label label="No match found" />
          </box>
        </box>
        <box className="controls" spacing={options.theme.spacing()}>
          <box hexpand className="user"></box>
          <box className="powermenu" spacing={options.theme.spacing()}>
            <button onClicked={() => powermenu.action("shutdown")}>
              <icon icon={getIcon(icons.powermenu.shutdown)} />
            </button>
            <button onClicked={() => powermenu.action("reboot")}>
              <icon icon={getIcon(icons.powermenu.reboot)} />
            </button>
            <button onClicked={() => powermenu.action("sleep")}>
              <icon icon={getIcon(icons.powermenu.sleep)} />
            </button>
            <button onClicked={() => powermenu.action("logout")}>
              <icon icon={getIcon(icons.powermenu.logout)} />
            </button>
          </box>
        </box>
      </box>
    </PopupWindow>
  );
}
