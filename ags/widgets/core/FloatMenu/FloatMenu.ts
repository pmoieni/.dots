import { icon } from "lib/utils";
import PopupWindow from "widgets/shared/PopupWindow";

interface ItemData {
    icon: string;
    cmd: string;
}

const list = Variable<
    [
        [ItemData, ItemData, ItemData],
        [ItemData, ItemData, ItemData],
        [ItemData, ItemData, ItemData],
    ]
>([
    [
        { icon: "binary", cmd: "one" },
        { icon: "binary", cmd: "two" },
        { icon: "binary", cmd: "three" },
    ],
    [
        { icon: "binary", cmd: "four" },
        { icon: "binary", cmd: "five" },
        { icon: "binary", cmd: "six" },
    ],
    [
        { icon: "binary", cmd: "seven" },
        { icon: "binary", cmd: "eight" },
        { icon: "binary", cmd: "nine" },
    ],
]);

const currPos = Variable([1, 1]);

const Item = (data: ItemData, pos: [number, number]) =>
    Widget.Button({
        className: currPos.bind().as((cp) => {
            if (cp[0] === pos[0] && cp[1] === pos[1]) return "focused item";

            return "item";
        }),
        expand: true,
        child: Widget.Box({
            vertical: true,
            expand: true,
            children: [Widget.Icon(icon(data.icon)), Widget.Label(data.cmd)],
        }),
    });

const Row = (items: [ItemData, ItemData, ItemData], y: number) =>
    Widget.Box({
        className: "row horizontal",
        expand: true,
        children: items.map((data, x) => Item(data, [x, y])),
    });

const move = (direction: "up" | "right" | "down" | "left") => {
    const val = currPos.getValue();

    switch (direction) {
        case "up":
            if (val[1] + 1 > 2) return;
            currPos.setValue([val[0], val[1] + 1]);
            break;
        case "right":
            if (val[0] + 1 > 2) return;
            currPos.setValue([val[0] + 1, val[1]]);
            break;
        case "down":
            if (val[1] - 1 < 0) return;
            currPos.setValue([val[0], val[1] - 1]);
            break;
        case "left":
            if (val[0] - 1 < 0) return;
            currPos.setValue([val[0] - 1, val[1]]);
            break;
    }
};

const Square = () =>
    Widget.Box({
        className: "floatmenu vertical",
        vertical: true,
        children: list.bind().as((l) => l.map((row, y) => Row(row, 2 - y))),
    });

export default () =>
    PopupWindow({
        name: "floatmenu",
        transition: "crossfade",
        keymode: "exclusive",
        child: Square(),
    })
        .keybind("h", () => move("left"))
        .keybind("j", () => move("down"))
        .keybind("k", () => move("up"))
        .keybind("l", () => move("right"))
        .keybind("Escape", () => currPos.setValue([1, 1]));
