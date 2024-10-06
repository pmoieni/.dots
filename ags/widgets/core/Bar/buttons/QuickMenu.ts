import {
    AudioIcon,
    BluetoothIcon,
    DNDIcon,
    MicrophoneIcon,
    NetworkIcon,
} from "widgets/shared/Indicators";

const audio = await Service.import("audio");

export default () =>
    Widget.Button({
        className: "bar-quickmenu",
        onClicked: () => App.toggleWindow("quickmenu"),
        onScrollUp: () => (audio.speaker.volume += 0.02),
        onScrollDown: () => (audio.speaker.volume -= 0.02),
        child: Widget.Box({
            className: "indicators horizontal",
            children: [
                DNDIcon(),
                BluetoothIcon(),
                NetworkIcon(),
                AudioIcon(),
                MicrophoneIcon(),
            ],
        }),
    });
