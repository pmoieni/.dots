import Gio from "gi://Gio?version=2.0";
import options from "options";
import { matugen } from "./matugen";

const settings = new Gio.Settings({
    schema: "org.gnome.desktop.interface",
});

function gtk() {
    settings.set_string("color-scheme", `prefer-${options.theme.scheme.value}`);
    matugen();
}

export default function init() {
    options.theme.scheme.connect("changed", gtk);
    gtk();
}
