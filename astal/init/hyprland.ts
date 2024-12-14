import Hyprland from "gi://AstalHyprland"
import options from "../options"
import { App } from "astal/gtk3"

const hypr = Hyprland.get_default()

const {
    hyprland,
    theme: {
        spacing,
        radius,
        border: { width },
        blur,
        dark: {
            bg: darkInactive,
            primary: { bg: darkActive },
        },
        light: {
            bg: lightInactive,
            primary: { bg: lightActive },
        },
        scheme,
    },
} = options

const deps = [
    "hyprland",
    spacing.key,
    radius.key,
    blur.key,
    width.key,
    darkActive.key,
    lightActive.key,
    scheme.key,
]

function active() {
    return scheme.value === "dark" ? darkActive.value : lightActive.value
}

function inactive() {
    return scheme.value === "dark" ? darkInactive.value : lightInactive.value
}

function rgba(color: string) {
    return `rgba(${color}ff)`.replace("#", "")
}

function sendBatch(batch: string[], cb: (() => void) | null) {
    const cmd = batch
        .filter((x) => !!x)
        .map((x) => `keyword ${x}`)
        .join("; ")

    return hypr.message_async(`[[BATCH]]/${cmd}`, cb)
}

function setupHyprland() {
    const wm_gaps = Math.floor(
        hyprland.gaps.value * spacing.value + width.value
    )

    sendBatch(
        [
            `general:border_size ${width.value}`,
            `general:gaps_out ${wm_gaps}`,
            `general:gaps_in ${Math.floor(wm_gaps / 2)}`,
            `general:col.active_border ${rgba(active())}`,
            `general:col.inactive_border ${rgba(inactive())}`,
            `decoration:rounding ${radius.value}`,
        ],
        null
    )

    sendBatch(
        App.get_windows().map((w) => `layerrule unset, ${w.name}`),
        () => {
            if (blur.value > 0) {
                sendBatch(
                    App.get_windows().flatMap((w) => [
                        `layerrule unset, ${w.name}`,
                        `layerrule blur, ${w.name}`,
                        `layerrule ignorealpha ${/* based on shadow color */ 0.29}, ${w.name}`,
                    ]),
                    null
                )
            }
        }
    )
}

export default function () {
    options.handler(deps, setupHyprland)
    setupHyprland()
}
