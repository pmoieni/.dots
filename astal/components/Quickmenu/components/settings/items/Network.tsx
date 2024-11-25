import Network from "gi://AstalNetwork";
import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { ArrowToggleButton, ToggleButton } from "../../../widgets/Toggle";
import { getNetworkIcon, icons } from "@assets/icons";
import { settingsMenu } from "../Settings";

export default function () {
  const network = Network.get_default();
  const icon = Variable.derive(
    [
      bind(network, "connectivity"),
      bind(network, "primary"),
      bind(network, "wifi"),
    ],
    (connectivity, primary, wifi) => {
      switch (primary) {
        case Network.Primary.WIRED:
          return getNetworkIcon(connectivity);
        default:
          return getNetworkIcon(connectivity, wifi);
      }
    },
  );

  return bind(network, "primary").as((p) => {
    switch (p) {
      case Network.Primary.WIRED:
        return (
          <ToggleButton state={true}>
            <box hexpand halign={Gtk.Align.CENTER}>
              <icon icon={icons.wired} />
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
              <icon icon={icon()} />
            </box>
          </ArrowToggleButton>
        );
    }
  });
}
