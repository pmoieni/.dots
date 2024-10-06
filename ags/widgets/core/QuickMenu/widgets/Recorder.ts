import icons from "lib/icons";
import screenrecord from "services/screenrecord";
import { SimpleToggleButton } from "../ToggleButton";

export const ScreenRecordToggle = () =>
    SimpleToggleButton({
        icon: icons.recorder.recording,
        label: screenrecord
            .bind("recording")
            .as((r) => (r ? "Stop" : "Record")),
        toggle: () =>
            screenrecord.recording
                ? (() => {
                      screenrecord.stop();
                  })()
                : (() => {
                      App.closeWindow("quickmenu");
                      App.openWindow("recorder");
                  })(),
        connection: [screenrecord, () => !screenrecord.recording],
    });
