import Network from "gi://AstalNetwork";
import { bind, Variable } from "astal";
import { getNetworkIcon } from "@assets/icons";

export default function () {
  const network = Network.get_default();
  const icon = Variable.derive(
    [
      bind(network, "primary"),
      bind(network, "connectivity"),
      bind(network, "wifi"),
    ],
    (primary, connectivity, wifi) => {
      switch (primary) {
        case Network.Primary.WIRED:
          return getNetworkIcon(connectivity);
        default:
          return getNetworkIcon(connectivity, wifi);
      }
    },
  );

  return <icon icon={icon()} />;
}
