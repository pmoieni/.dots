import { networkIcon } from "@lib/vars";
import { bind } from "astal";

export default function () {
  return <icon icon={bind(networkIcon)} />;
}
