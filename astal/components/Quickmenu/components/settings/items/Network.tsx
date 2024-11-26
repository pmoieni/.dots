import Network from "gi://AstalNetwork";
import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { ArrowToggleButton, ToggleButton } from "../../../widgets/Toggle";
import { settingsMenu } from "../Settings";

export default function () {
  const network = Network.get_default();

  return bind(network, "primary").as((p) => {
    switch (p) {
      case Network.Primary.WIRED:
        return (
          <ToggleButton state={true}>
            <box hexpand halign={Gtk.Align.CENTER}>
              <icon icon={bind(network, "wired").as((w) => w.iconName)} />
            </box>
          </ToggleButton>
        );
      default:
        return (
          <ArrowToggleButton
            state={bind(network, "wifi").as((wifi) => wifi.enabled)}
            onToggled={() => (network.wifi.enabled = !network.wifi.enabled)}
            onActivate={() => settingsMenu.set("network")}
          >
            <box hexpand halign={Gtk.Align.CENTER}>
              <icon icon={bind(network, "wifi").as((w) => w.iconName)} />
            </box>
          </ArrowToggleButton>
        );
    }
  });
}
