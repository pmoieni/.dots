import recorder from "services/screenrecord";
import { Variable as Var } from "types/variable";
import PopupWindow from "widgets/shared/PopupWindow";

const Option = (title: string, val: Var<boolean>) =>
    Widget.Box({
        className: "option horizontal",
        hexpand: true,
        children: [
            Widget.Label({
                hpack: "start",
                hexpand: true,
                label: title,
            }),
            Widget.Switch({
                hpack: "end",
                hexpand: true,
            })
                .on("notify::active", (self) => (val.value = self.active))
                .hook(val, (self) => (self.active = val.value)),
        ],
    });

export default () => {
    const full = Variable(true);
    const recordAudio = Variable(false);

    const Options = () =>
        Widget.Box({
            hexpand: true,
            className: "options vertical",
            vertical: true,
            children: [
                Option("Full Size", full),
                Option("Record Audio", recordAudio),
            ],
        });

    return PopupWindow({
        name: "recorder",
        transition: "crossfade",
        child: Widget.Box({
            className: "recorder vertical",
            vertical: true,
            children: [
                Options(),
                Widget.Button({
                    hexpand: true,
                    child: Widget.Label({
                        label: "Start Recording",
                    }),
                    onClicked: () => {
                        App.closeWindow("recorder");
                        recorder.start(full.value, recordAudio.value);
                    },
                }),
            ],
        }),
    });
};
