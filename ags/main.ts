import "style/style";
import { init } from "services/index";
import { setupDateMenu } from "widgets/core/DateMenu/DateMenu";

import Bar from "widgets/core/Bar/Bar";
import Notifications from "widgets/core/Notifications/Notifications";
import PowerMenu from "widgets/core/PowerMenu/PowerMenu";
import Verification from "widgets/core/PowerMenu/Verification";
import QuickMenu from "widgets/core/QuickMenu/QuickMenu";
import Workspaces from "widgets/core/Workspaces/Workspaces";
import Launcher from "widgets/core/Launcher/Launcher";
import Recorder from "widgets/core/Recorder/Recorder";
import FloatMenu from "widgets/core/FloatMenu/FloatMenu";
import Dropdown from "widgets/core/Dropdown/index";
import options from "options";

declare global {
    const OPTIONS: string;
    const TMP: string;
    const USER: string;
}

App.config({
    icons: "./assets",
    onConfigParsed: () => {
        setupDateMenu();
        init();
    },
    closeWindowDelay: {
        launcher: options.transition.value,
        workspaces: options.transition.value,
        quickmenu: options.transition.value,
        datemenu: options.transition.value,
    },
    windows: () => [
        Bar(),
        Dropdown(),
        Notifications(),
        PowerMenu(),
        Verification(),
        QuickMenu(),
        Workspaces(),
        Launcher(),
        Recorder(),
        FloatMenu(),
    ],
});
