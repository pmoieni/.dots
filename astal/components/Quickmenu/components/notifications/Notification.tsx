export default function Notification(props: Props) {
  const { notification: n, onHoverLost, setup } = props;
  const { START, CENTER, END } = Gtk.Align;

  return (
    <box vertical>
      <box className="header horizontal">
        {(n.appIcon || n.desktopEntry) && (
          <icon
            className="app-icon"
            visible={Boolean(n.appIcon || n.desktopEntry)}
            icon={n.appIcon || n.desktopEntry}
          />
        )}
        <label
          className="app-name"
          halign={START}
          truncate
          label={n.appName || "Unknown"}
        />
        <label className="time" hexpand halign={END} label={time(n.time)} />
        <button onClicked={() => n.dismiss()}>
          <icon icon={getIcon(icons.ui.close)} />
        </button>
      </box>
      {/*<Gtk.Separator visible />*/}
      <box className="content horizontal">
        {n.image && fileExists(n.image) && (
          <box
            valign={START}
            className="image"
            css={`
              background-image: url("${n.image}");
            `}
          />
        )}
        {n.image && isIcon(n.image) && (
          <box expand={false} valign={START} className="icon-image">
            <icon icon={n.image} expand halign={CENTER} valign={CENTER} />
          </box>
        )}
        <box className="text" hexpand vertical>
          <label
            className="summary"
            halign={START}
            xalign={0}
            label={n.summary}
            truncate
          />
          <box expand>
            {n.body && (
              <label
                className="body"
                wrap
                useMarkup
                hexpand
                halign={START}
                xalign={0}
                justifyFill
                label={n.body}
              />
            )}
          </box>
        </box>
      </box>
      {n.get_actions().length > 0 && (
        <box className="actions horizontal">
          {n.get_actions().map(({ label, id }) => (
            <button hexpand onClicked={() => n.invoke(id)}>
              <label label={label} halign={CENTER} hexpand />
            </button>
          ))}
        </box>
      )}
    </box>
  );
}
