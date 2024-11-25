import { type EventBox } from "astal/gtk3/widget";
import Notifd from "gi://AstalNotifd";
import Notification from "@widgets/Notification";
import options from "options";

const urgency = (n: Notifd.Notification) => {
  const { LOW, NORMAL, CRITICAL } = Notifd.Urgency;
  switch (n.urgency) {
    case LOW:
      return "low";
    case CRITICAL:
      return "critical";
    case NORMAL:
    default:
      return "normal";
  }
};

type Props = {
  setup(self: EventBox): void;
  onHoverLost(self: EventBox): void;
  notification: Notifd.Notification;
};

export default function (props: Props) {
  const { notification: n, onHoverLost, setup } = props;

  return (
    <eventbox setup={setup} onHoverLost={onHoverLost}>
      <box
        widthRequest={options.widgets.notification.width.value}
        className={`notification-box ${urgency(n)}`}
      >
        <Notification notification={n} />
      </box>
    </eventbox>
  );
}
