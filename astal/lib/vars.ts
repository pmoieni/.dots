import { getMicIcon, getSpeakerIcon } from "@assets/icons";
import { bind, Variable } from "astal";
import Wp from "gi://AstalWp";

export const scrimWindowNames = Variable<Array<string>>([]);

const mic = Wp.get_default()!.defaultMicrophone;
export const micIcon = Variable.derive(
  [bind(mic, "volume"), bind(mic, "mute")],
  (v, m) => getMicIcon(v, m),
);

const speaker = Wp.get_default()!.defaultSpeaker;
export const speakerIcon = Variable.derive(
  [bind(speaker, "volume"), bind(speaker, "mute")],
  (v, m) => getSpeakerIcon(v, m),
);
