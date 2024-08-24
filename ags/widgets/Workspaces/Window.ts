import { type Client } from "types/service/hyprland";
import { createSurfaceFromWidget, icon } from "lib/utils";
import Gdk from "gi://Gdk";
import Gtk from "gi://Gtk?version=3.0";
import options from "options";
import icons from "lib/icons";

const TARGET = [Gtk.TargetEntry.new("text/plain", Gtk.TargetFlags.SAME_APP, 0)];
const hyprland = await Service.import("hyprland");
const apps = await Service.import("applications");
const dispatch = (args: string) => hyprland.messageAsync(`dispatch ${args}`);

export default ({ address, size: [w, h], class: c, title }: Client) =>
    Widget.Button({
        className: "client",
        attribute: { address },
        tooltipText: `${title}`,
        child: Widget.Icon({
            css: options.widgets.workspaces.scale.bind().as(
                (v) => `
            min-width: ${(v / 100) * w}px;
            min-height: ${(v / 100) * h}px;
        `
            ),
            icon: apps.bind("list").as((list) => {
                const app = list.find((app) => app.match(c));
                if (!app) return icons.fallback.executable;

                return icon(
                    app.icon_name + "-symbolic",
                    icons.fallback.executable + "-symbolic"
                );
            }),
        }),
        onSecondaryClick: () => dispatch(`closewindow address:${address}`),
        onClicked: () => {
            dispatch(`focuswindow address:${address}`);
            App.closeWindow("workspaces");
        },
        setup: (btn) =>
            btn
                .on("drag-data-get", (_w, _c, data) =>
                    data.set_text(address, address.length)
                )
                .on("drag-begin", (_, context) => {
                    Gtk.drag_set_icon_surface(
                        context,
                        createSurfaceFromWidget(btn)
                    );
                    btn.toggleClassName("hidden", true);
                })
                .on("drag-end", () => btn.toggleClassName("hidden", false))
                .drag_source_set(
                    Gdk.ModifierType.BUTTON1_MASK,
                    TARGET,
                    Gdk.DragAction.COPY
                ),
    });
