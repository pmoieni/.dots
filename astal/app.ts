import "./globals"
import "./options"
import { init } from "./init"
import { App } from "astal/gtk3"
import Bar from "@components/Bar"
import QuickMenu from "@components/Quickmenu"
import AppLauncher from "@components/Applauncher"
import NotificationPopups from "@components/Notifications/NotificationPopups"
import Scrim from "@widgets/Scrim"
import Screenrecord from "@services/screenrecord"
import Wallpaper from "@services/wallpaper"
import { toggleWindow } from "@lib/utils"
import Verification from "@components/Applauncher/Verification"
import Recorder from "@components/Recorder"

App.start({
    icons: "./assets/icons",
    instanceName: "astal",
    main() {
        Scrim()
        Bar(0)
        AppLauncher()
        Verification()
        QuickMenu()
        NotificationPopups(0)
        Recorder()

        init()
    },
    requestHandler(req: string, res: (resp: any) => void) {
        const args = req.split(" ")

        switch (args[0]) {
            case "toggle":
                toggleWindow(args[1])
                return res("ok")
            case "screenrecord":
                const screenrecord = Screenrecord.get_default()

                switch (args[1]) {
                    case "start":
                        screenrecord.start()
                        return res("Started recording")
                    case "stop":
                        screenrecord.stop()
                        return res("Finished recording")
                    case "ssf":
                        screenrecord.screenshot(true)
                        return res("Fullscreen screenshot")
                    case "ss":
                        screenrecord.screenshot(false)
                        return res("Screenshot")
                    default:
                        return res("Unknown command")
                }
            case "wallpaper":
                const wp = Wallpaper.get_default()
                wp.random()
                return "Setting new random wallpaper"
            default:
                return res("Unknown command")
        }
    },
})
