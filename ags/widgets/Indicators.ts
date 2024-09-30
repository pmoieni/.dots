import icons from "lib/icons";

const notifications = await Service.import("notifications");
const network = await Service.import("network");
const audio = await Service.import("audio");
const bluetooth = await Service.import("bluetooth");

export const MicrophoneIcon = () =>
    Widget.Icon().hook(audio.microphone, (self) => {
        const vol = audio.microphone.is_muted ? 0 : audio.microphone.volume;
        const { muted, low, medium, high } = icons.audio.mic;
        const cons = [
            [67, high],
            [34, medium],
            [1, low],
            [0, muted],
        ] as const;
        self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || "";
    });

export const AudioIcon = () =>
    Widget.Icon().hook(audio.speaker, (self) => {
        const vol = audio.speaker.is_muted ? 0 : audio.speaker.volume;
        const { muted, low, medium, high, overamplified } = icons.audio.volume;
        const cons = [
            [101, overamplified],
            [67, high],
            [34, medium],
            [1, low],
            [0, muted],
        ] as const;
        self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || "";
    });

export const DNDIcon = () =>
    Widget.Icon({
        visible: notifications.bind("dnd"),
        icon: icons.notifications.silent,
    });

export const NetworkIconName = () => {
    var icon = "";
    if (network.primary === "wired") {
        icon = icons.network.wired;
    } else {
        const { none, low, medium, high } = icons.network.strength;
        const cons = [
            [60, high],
            [40, medium],
            [20, low],
            [0, none],
        ] as const;
        icon =
            network.wifi.state === "activated"
                ? cons.find(([n]) => n <= network.wifi.strength)?.[1] || ""
                : icons.network.strength.disconnected;
    }

    return icon;
};

export const NetworkIcon = () =>
    Widget.Icon().hook(network, (self) => {
        self.icon = NetworkIconName();
        // self.visible = !!icon;
    });

export const BluetoothIcon = () =>
    Widget.Overlay({
        class_name: "bluetooth",
        passThrough: true,
        visible: bluetooth.bind("enabled"),
        child: Widget.Icon({
            icon: icons.bluetooth.enabled,
        }),
        overlay: Widget.Label({
            hpack: "end",
            vpack: "start",
            label: bluetooth.bind("connected_devices").as((c) => `${c.length}`),
            visible: bluetooth
                .bind("connected_devices")
                .as((c) => c.length > 0),
        }),
    });
