import { App } from "astal/gtk3"
import options from "../options"
import { execAsync, writeFileAsync } from "astal"
import { dependencies } from "@lib/utils"

const deps = ["font", "theme"]

const { dark, light, scheme, padding, spacing, radius, border, blur, opacity } =
    options.theme

const t = (dark: any, light: any) => {
    return scheme.value === "dark" ? dark : light
}

const $ = (name: string, value: string) => {
    return `$${name}: ${value};`
}

const variables = () => [
    "@use 'sass:color';",
    $(
        "bg",
        blur.value
            ? `color.adjust(${t(dark.bg.value, light.bg.value)}, $alpha: -${blur.value / 100})`
            : t(dark.bg.value, light.bg.value)
    ),
    $("fg", t(dark.fg.value, light.fg.value)),
    $("primary-bg", t(dark.primary.bg.value, light.primary.bg.value)),
    $("primary-fg", t(dark.primary.fg.value, light.primary.fg.value)),
    $("error-bg", t(dark.error.bg.value, light.error.bg.value)),
    $("error-fg", t(dark.error.fg.value, light.error.fg.value)),
    $("border-width", `${border.width.value}px`),
    $(
        "border-color",
        `color.adjust(${t(dark.widget.value, light.widget.value)}, $alpha: -${
            border.opacity.value / 100
        })`
    ),
    $("border", "$border-width solid $border-color"),
    $(
        "widget-bg",
        `color.adjust(${t(dark.widget.value, light.widget.value)}, $alpha: -${opacity.value / 100})`
    ),
    $("scheme", scheme.value),
    $("padding", `${padding.value}pt`),
    $("spacing", `${spacing.value}pt`),
    $("radius", `${radius.value}px`),
    $("transition", `${options.transition.value}ms`),
    $(
        "hover-bg",
        `color.adjust(${t(dark.widget.value, light.widget.value)}, $alpha: -${
            (opacity.value * 0.9) / 100
        })`
    ),
    $(
        "hover-fg",
        `color.adjust(${t(dark.fg.value, light.fg.value)}, $lightness: 8%)`
    ),
    $("font-size", `${options.font.size.value}pt`),
    $("font-name", options.font.name.value),
]

async function resetCss() {
    if (!dependencies("sass")) return

    try {
        const css = `${TMP}/main.css`
        const vars = variables().join("\n")
        await writeFileAsync(`${TMP}/vars.scss`, vars)
        await execAsync(["sass", `${SRC}/style/style.scss`, css])
        App.apply_css(css, true)
    } catch (error) {
        error instanceof Error ? logError(error) : console.error(error)
    }
}

options.handler(deps, resetCss)
export default function () {
    resetCss()
}
