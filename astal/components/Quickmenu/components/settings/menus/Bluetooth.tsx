import Bluetooth from "gi://AstalBluetooth";
import { bind, timeout } from "astal";
import { icons } from "@assets/icons";
import Menu from "../Menu";

const bluetooth = Bluetooth.get_default();

type DeviceItemProps = {
  device: Bluetooth.Device;
};

const DeviceItem = ({ device }: DeviceItemProps) => {
  return (
    <button
      on_clicked={() => {
        if (!bluetooth.isPowered) {
          bluetooth.toggle();
        }
        timeout(100, () => {
          device.connect_device(() => {});
        });
      }}
    >
      <box>
        <icon icon={device.icon + "-symbolic"} />
        <label label={device.name} />
        {
          //Todo: Add bluetooth battery percentage
          // <label
          // 	className="bluetooth__percentage"
          // 	label={`${device.battery_percentage}%`}
          // 	visible={bind(device, "battery_percentage").as(
          // 		(p) => p > 0,
          // 	)}
          // />
        }
        <box hexpand />
        {
          // TODO: Add spinner
          // <spinner visible={bind(device, "connecting")} />
        }
        <icon
          icon={icons.ui.tick}
          visible={bind(device, "connected").as((connected) => connected)}
        />
      </box>
    </button>
  );
};

export default () => {
  return (
    <Menu name="bluetooth">
      <box vertical className={"content"}>
        {bind(bluetooth, "devices").as((devices) =>
          devices.map((device) => <DeviceItem device={device} />),
        )}
      </box>
    </Menu>
  );
};
