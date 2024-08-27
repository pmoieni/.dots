export const substitutes = {
    "audio-headset-bluetooth": "icon-headphones-symbolic",
    "org.wezfurlong.wezterm-symbolic": "icon-terminal-symbolic",
    "audio-card-analog-usb": "icon-speaker-symbolic",
    "audio-card-analog-pci": "icon-graphics-card-symbolic",
    "preferences-system": "icon-faders-symbolic",
    "com.github.Aylur.ags-symbolic": "controls-symbolic",
    "com.github.Aylur.ags": "controls-symbolic",
    "telegram-symbolic": "icon-telegram-logo-symbolic",
    "Alacritty-symbolic": "icon-terminal-symbolic",
};

export default {
    missing: "image-missing-symbolic",
    fallback: {
        executable: "icon-binary-symbolic",
        notification: "icon-bell-symbolic",
        video: "icon-video-symbolic",
        audio: "icon-speaker-symbolic",
    },
    nix: {
        nix: "nix-snowflake-symbolic",
    },
    app: {
        terminal: "icon-terminal-symbolic",
    },
    ui: {
        close: "icon-x-circle-symbolic",
        colorpicker: "icon-eyedropper-symbolic",
        info: "icon-info-symbolic",
        link: "icon-link-symbolic",
        lock: "icon-lock-symbolic",
        menu: "icon-list-symbolic",
        refresh: "icon-arrows-clockwise-symbolic",
        search: "icon-magnifying-glass-symbolic",
        settings: "icon-gear-symbolic",
        themes: "icon-palette-symbolic",
        tick: "icon-check-symbolic",
        time: "icon-clock-symbolic",
        music: "icon-music-note-symbolic",
        toolbars: "icon-app-window-symbolic",
        warning: "icon-warning-symbolic",
        arrow: {
            right: "icon-arrow-right-symbolic",
            left: "icon-arrow-left-symbolic",
            down: "icon-arrow-down-symbolic",
            up: "icon-arrow-up-symbolic",
        },
    },
    audio: {
        mic: {
            muted: "icon-microphone-slash-symbolic",
            low: "icon-microphone-symbolic",
            medium: "icon-microphone-symbolic",
            high: "icon-microphone-symbolic",
        },
        volume: {
            muted: "icon-speaker-x-symbolic",
            low: "icon-speaker-none-symbolic",
            medium: "icon-speaker-low-symbolic",
            high: "icon-speaker-high-symbolic",
            overamplified: "icon-speaker-high-symbolic",
        },
        type: {
            headset: "icon-headphones-symbolic",
            speaker: "icon-speaker-symbolic",
            card: "icon-graphics-card-symbolic",
        },
        mixer: "icon-equalizer-symbolic",
    },
    network: {
        wifi: "icon-wifi-high-symbolic",
        wired: "icon-wired-symbolic",
        strength: {
            disconnected: "icon-wifi-slash-symbolic",
            none: "icon-wifi-none-symbolic",
            low: "icon-wifi-low-symbolic",
            medium: "icon-wifi-medium-symbolic",
            high: "icon-wifi-high-symbolic",
        },
    },
    battery: {
        charging: "icon-battery-charging-symbolic",
        warning: "icon-battery-warning-symbolic",
    },
    bluetooth: {
        enabled: "icon-bluetooth-symbolic",
        disabled: "icon-bluetooth-slash-symbolic",
    },
    brightness: {
        indicator: "icon-sun-symbolic",
        keyboard: "keyboard-brightness-symbolic",
        screen: "display-brightness-symbolic",
    },
    powermenu: {
        lock: "icon-lock-symbolic",
        reboot: "icon-arrow-clockwise-symbolic",
        logout: "icon-sign-out-symbolic",
        shutdown: "icon-power-symbolic",
        sleep: "icon-moon-symbolic",
    },
    recorder: {
        recording: "icon-record-symbolic",
    },
    notifications: {
        noisy: "icon-bell-symbolic",
        silent: "icon-bell-slash-symbolic",
        message: "icon-chat-symbolic",
    },
    trash: {
        full: "icon-trash-symbolic",
        empty: "icon-trash-symbolic",
    },
    mpris: {
        shuffle: {
            enabled: "icon-shuffle-symbolic",
            disabled: "icon-arrows-down-up-symbolic",
        },
        loop: {
            none: "media-playlist-repeat-symbolic",
            track: "icon-music-note-symbolic",
            playlist: "icon-playlist-symbolic",
        },
        playing: "icon-pause-symbolic",
        paused: "icon-play-symbolic",
        stopped: "icon-stop-symbolic",
        prev: "icon-skip-back-symbolic",
        next: "icon-skip-forward-symbolic",
    },
    system: {
        cpu: "icon-cpu-symbolic",
        ram: "icon-memory-symbolic",
        temp: "icon-thermometer-symbolic",
    },
    color: {
        dark: "icon-moon-symbolic",
        light: "icon-sun-symbolic",
    },
};
