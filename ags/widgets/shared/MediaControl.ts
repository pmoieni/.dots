import { type MprisPlayer } from "types/service/mpris";
import icons from "lib/icons";
import options from "options";
import { SimpleToggleButton, ToggleButton } from "./ToggleButton";

const mpris = await Service.import("mpris");
const { media } = options.widgets.playerctl;

function lengthStr(length: number) {
    const min = Math.floor(length / 60);
    const sec = Math.floor(length % 60);
    const sec0 = sec < 10 ? "0" : "";
    return `${min}:${sec0}${sec}`;
}

const Player = (player: MprisPlayer) => {
    const cover = Widget.Box({
        class_name: "cover",
        vpack: "start",
        css: Utils.merge(
            [
                player.bind("cover_path"),
                player.bind("track_cover_url"),
                media.coverSize.bind(),
            ],
            (path, url, size) => {
                let art = path || url;

                if (!art || art === undefined) {
                    art =
                        Utils.HOME +
                        "/.config/ags/assets/icon-music-note-symbolic.svg";
                }

                return `
            min-width: ${size}px;
            min-height: ${size}px;
            background-image: url('${art}');
        `;
            }
        ),
    });

    const title = Widget.Label({
        class_name: "title",
        max_width_chars: 20,
        truncate: "end",
        hpack: "start",
        label: player.bind("track_title"),
    });

    const artist = Widget.Label({
        class_name: "artist",
        max_width_chars: 20,
        truncate: "end",
        hpack: "start",
        label: player.bind("track_artists").as((a) => a.join(", ")),
    });

    const positionSlider = Widget.Slider({
        class_name: "position",
        draw_value: false,
        on_change: ({ value }) => (player.position = value * player.length),
        setup: (self) => {
            const update = () => {
                const { length, position } = player;
                self.visible = length > 0;
                self.value = length > 0 ? position / length : 0;
            };
            self.hook(player, update);
            self.hook(player, update, "position");
            self.poll(1000, update);
        },
    });

    const positionLabel = Widget.Label({
        class_name: "position",
        hpack: "start",
        setup: (self) => {
            const update = (_: unknown, time?: number) => {
                self.label = lengthStr(time || player.position);
                self.visible = player.length > 0;
            };
            self.hook(player, update, "position");
            self.poll(1000, update);
        },
    });

    const lengthLabel = Widget.Label({
        class_name: "length",
        hpack: "end",
        visible: player.bind("length").as((l) => l > 0),
        label: player.bind("length").as(lengthStr),
    });

    const playericon = Widget.Icon({
        class_name: "icon",
        hexpand: true,
        hpack: "end",
        vpack: "start",
        tooltip_text: player.identity || "",
        // TODO: show app icon
        icon: icons.fallback.audio,
    });

    const playPause = Widget.Button({
        class_name: "play-pause",
        on_clicked: () => player.playPause(),
        sensitive: player.bind("can_play"),
        child: Widget.Icon({
            icon: player.bind("play_back_status").as((s) => {
                switch (s) {
                    case "Playing":
                        return icons.mpris.playing;
                    case "Paused":
                        return icons.mpris.paused;
                    case "Stopped":
                        return icons.mpris.stopped;
                }
            }),
        }),
    });

    const prev = Widget.Button({
        on_clicked: () => player.previous(),
        sensitive: player.bind("can_go_prev"),
        child: Widget.Icon(icons.mpris.prev),
    });

    const next = Widget.Button({
        on_clicked: () => player.next(),
        sensitive: player.bind("can_go_next"),
        child: Widget.Icon(icons.mpris.next),
    });

    const shuffle = () =>
        ToggleButton({
            child: Widget.Icon(icons.ui.shuffle),
            onClicked: () => player.shuffle(),
            expand: true,
            connection: [player, () => !!player.shuffle_status],
        });

    const loop = () =>
        ToggleButton({
            child: Widget.Icon().hook(
                player,
                (self) => {
                    self.icon =
                        player.loop_status === "Track"
                            ? icons.ui.repeat_once
                            : icons.ui.repeat;
                },
                "changed"
            ),
            onClicked: () => player.loop(),
            expand: true,
            connection: [player, () => player.loop_status !== "None"],
        });

    return Widget.Box({
        class_name: "player",
        vertical: true,
        expand: true,
        children: [
            Widget.Box({
                class_name: "top",
                children: [
                    cover,
                    Widget.Box(
                        { vertical: true },
                        Widget.Box([title, playericon]),
                        artist,
                        Widget.Box({ vexpand: true }),
                        positionSlider,
                        Widget.CenterBox({
                            class_name: "footer horizontal",
                            start_widget: positionLabel,
                            center_widget: Widget.Box([prev, playPause, next]),
                            end_widget: lengthLabel,
                        })
                    ),
                ],
            }),
            Widget.Box({
                class_name: "bottom horizontal",
                children: [shuffle(), loop()],
            }),
        ],
    });
};

export const MediaControl = () => {
    const currIdx = Variable(0);
    const length = Variable(mpris.players.length);
    mpris.connect("changed", ({ players }) => {
        length.setValue(players.length);
    });

    const next = () => {
        if (length.getValue() < 2) return;

        if (currIdx.getValue() + 1 >= length.getValue()) {
            currIdx.setValue(0);
            return;
        }

        currIdx.setValue(currIdx.getValue() + 1);
    };

    const prev = () => {
        if (length.getValue() < 2) return;

        if (currIdx.getValue() === 0) {
            currIdx.setValue(length.getValue() - 1);
            return;
        }

        currIdx.setValue(currIdx.getValue() - 1);
    };

    const NextBtn = () =>
        Widget.Button({
            expand: true,
            child: Widget.Icon(icons.ui.arrow.up),
            onClicked: next,
        });

    const PrevBtn = () =>
        Widget.Button({
            expand: true,
            child: Widget.Icon(icons.ui.arrow.down),
            onClicked: prev,
        });

    return Widget.Box({
        class_name: "media-control horizontal",
        children: [
            Widget.Box({
                class_name: "arrows",
                vertical: true,
                children: [NextBtn(), PrevBtn()],
                visible: length.bind().as((l) => l > 1),
            }),
            Widget.Box({
                class_name: "media",
                child: Utils.merge(
                    [currIdx.bind(), mpris.bind("players")],
                    (idx, ps) => {
                        // TODO: don't use empty box as fallback
                        return ps[idx] ? Player(ps[idx]) : Widget.Box();
                    }
                ),
            }),
        ],
    }).hook(
        mpris,
        (self) => {
            self.visible = !!mpris.getPlayer();
        },
        "changed"
    );
};
