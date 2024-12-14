import options from "options"
import { dependencies, ensureDirectory } from "@lib/utils"
import { execAsync, GLib, subprocess } from "astal"
import GObject, { register, signal } from "astal/gobject"

export type Resolution = "1366x768" | "1920x1080" | "UHD"
export type Market =
    | "zh-CN"
    | "en-US"
    | "ja-JP"
    | "en-AU"
    | "en-GB"
    | "de-DE"
    | "en-NZ"
    | "en-CA"
    | "en-IN"
export type Index = "random" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const WP = `${GLib.get_home_dir()}/.config/background`
const Cache = `${GLib.get_home_dir()}/Pictures/Wallpapers/Bing`
const API = "https://www.bing.com/HPImageArchive.aspx"

@register({ GTypeName: "Wallpaper" })
export default class Wallpaper extends GObject.Object {
    static instance: Wallpaper
    static get_default() {
        if (!this.instance) this.instance = new Wallpaper()

        return this.instance
    }

    defaultPath = WP

    @signal()
    declare wallpaper: () => void

    async #wallpaper() {
        const pos = await execAsync(["hyprctl", "cursorpos"])

        await execAsync([
            "swww",
            "img",
            "--invert-y",
            "--transition-type",
            "grow",
            "--transition-pos",
            pos.replace(" ", ""),
            WP,
        ])

        this.wallpaper()
    }

    async #setWallpaper(path: string) {
        await execAsync(`cp ${path} ${WP}`)
        this.#wallpaper()
    }

    async #fetchBing() {
        /*
    Utils.notify({
      summary: "Fetching new wallpaper.",
      body: "please wait.",
      iconName: icons.notificatio.notification,
      urgency: "normal",
      timeout: 5000,
    });
        */

        const idx =
            options.wallpaper.idx.value === "random"
                ? Math.floor(Math.random() * 9)
                : options.wallpaper.idx

        const res = await execAsync([
            "curl",
            `${API}?format=js&idx=${idx}&n=1&mkt=${options.wallpaper.market.value}`,
        ])

        if (!res.startsWith("{")) return console.warn("bing api", res)

        const { images } = JSON.parse(res)
        const urlbase = images[0].urlbase
        if (!urlbase) return console.warn("bing api", res)

        const file = `${Cache}/${urlbase.replace("/th?id=", "")}.jpg`

        ensureDirectory(Cache)
        await execAsync([
            "curl",
            `${"https://www.bing.com" + urlbase + "_" + options.wallpaper.resolution.value + ".jpg"}`,
            "--output",
            file,
        ])
        this.#setWallpaper(file)
    }

    readonly random = () => {
        this.#fetchBing()
    }

    constructor() {
        if (!dependencies("swww", "curl")) return

        super()

        subprocess("swww-daemon")
        this.#wallpaper()
    }
}
