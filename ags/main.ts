import "style/style";
import { init } from "services/index";
import Bar from "widgets/Bar/Bar";
import DateMenu from "widgets/DateMenu/DateMenu";
import Notifications from "widgets/Notifications/Notifications";
import PowerMenu from "widgets/PowerMenu/PowerMenu";
import Verification from "widgets/PowerMenu/Verification";
import QuickMenu from "widgets/QuickMenu/QuickMenu";
import Workspaces from "widgets/Workspaces/Workspaces";
import Launcher from "widgets/Launcher/Launcher";
import Recorder from "widgets/Recorder/Recorder";
import options from "options";

declare global {
    const OPTIONS: string;
    const TMP: string;
    const USER: string;
}

App.config({
    icons: "./assets",
    onConfigParsed: () => {
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
        DateMenu(), // WIP
        Notifications(), // WIP
        PowerMenu(),
        Verification(),
        QuickMenu(),
        Workspaces(),
        Launcher(),
        Recorder(),
    ],
});
