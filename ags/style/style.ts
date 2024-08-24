import { type Opt } from "lib/option";
import options from "options";
import { bash, dependencies, sh } from "lib/utils";

const deps = [
    "font",
    "theme",
    "widgets.bar.position",
    "widgets.bar.battery.charging",
];

const { dark, light, scheme } = options.theme;
const { padding, spacing, radius, border, blur, widget } = options;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const t = (dark: Opt<any> | string, light: Opt<any> | string) =>
    scheme.value === "dark" ? `${dark}` : `${light}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`;

const variables = () => [
    $(
        "bg",
        blur.value
            ? `transparentize(${t(dark.bg, light.bg)}, ${blur.value / 100})`
            : t(dark.bg, light.bg)
    ),
    $("fg", t(dark.fg, light.fg)),
    $("primary-bg", t(dark.primary.bg, light.primary.bg)),
    $("primary-fg", t(dark.primary.fg, light.primary.fg)),
    $("error-bg", t(dark.error.bg, light.error.bg)),
    $("error-fg", t(dark.error.fg, light.error.fg)),
    $("border-width", `${border.width}px`),
    $(
        "widget-bg",
        `transparentize(${t(dark.widget, light.widget)}, ${
            widget.opacity.value / 100
        })`
    ),
    $(
        "border-color",
        `transparentize(${t(dark.border, light.border)}, ${
            border.opacity.value / 100
        })`
    ),
    $("border", "$border-width solid $border-color"),

    $("scheme", scheme),
    $("padding", `${padding}pt`),
    $("spacing", `${spacing}pt`),
    $("radius", `${radius}px`),
    $("transition", `${options.transition}ms`),
    $(
        "hover-bg",
        `transparentize(${t(dark.widget, light.widget)}, ${
            (widget.opacity.value * 0.9) / 100
        })`
    ),
    $("hover-fg", `lighten(${t(dark.fg, light.fg)}, 8%)`),
    $("font-size", `${options.font.size}pt`),
    $("font-name", options.font.name),
];

async function resetCss() {
    if (!dependencies("sass", "fd")) return;

    try {
        const vars = `${TMP}/variables.scss`;
        const scss = `${TMP}/main.scss`;
        const css = `${TMP}/main.css`;

        const fd = await bash(`fd ".scss" ${App.configDir}`);
        const files = fd.split(/\s+/);
        const imports = [vars, ...files].map((f) => `@import '${f}';`);

        await Utils.writeFile(variables().join("\n"), vars);
        await Utils.writeFile(imports.join("\n"), scss);
        await bash(`sass ${scss} ${css}`);

        App.applyCss(css, true);
    } catch (error) {
        error instanceof Error ? logError(error) : console.error(error);
    }
}

Utils.monitorFile(App.configDir, resetCss);
options.handler(deps, resetCss);
await resetCss();
