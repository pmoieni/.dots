import options from "options";
import { dependencies, sh } from "lib/utils";
import icons from "lib/icons";

export type Resolution = "1366x768" | "1920x1080" | "UHD";
export type Market =
    | "zh-CN"
    | "en-US"
    | "ja-JP"
    | "en-AU"
    | "en-GB"
    | "de-DE"
    | "en-NZ"
    | "en-CA"
    | "en-IN";
export type Index = "random" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const WP = `${Utils.HOME}/.config/background`;
const Cache = `${Utils.HOME}/Pictures/Wallpapers/Bing`;
const API = "https://www.bing.com/HPImageArchive.aspx";

class Wallpaper extends Service {
    static {
        Service.register(
            this,
            {},
            {
                wallpaper: ["string"],
            }
        );
    }

    #blockMonitor = false;

    #wallpaper() {
        if (!dependencies("swww")) return;

        sh("hyprctl cursorpos").then((pos) => {
            sh([
                "swww",
                "img",
                "--invert-y",
                "--transition-type",
                "grow",
                "--transition-pos",
                pos.replace(" ", ""),
                WP,
            ]).then(() => {
                this.changed("wallpaper");
            });
        });
    }

    async #setWallpaper(path: string) {
        this.#blockMonitor = true;

        await sh(`cp ${path} ${WP}`);
        this.#wallpaper();

        this.#blockMonitor = false;
    }

    async #fetchBing() {
        Utils.notify({
            summary: "Fetching new wallpaper.",
            body: "please wait.",
            iconName: icons.fallback.notification,
            urgency: "normal",
            timeout: 5000,
        });

        const idx =
            options.wallpaper.idx.value === "random"
                ? Math.floor(Math.random() * 9)
                : options.wallpaper.idx;

        const res = await Utils.fetch(API, {
            params: {
                format: "js",
                idx: idx,
                n: 1,
                mkt: options.wallpaper.market.value,
            },
        }).then((res) => res.text());

        if (!res.startsWith("{")) return console.warn("bing api", res);

        const { images } = JSON.parse(res);
        const urlbase = images[0].urlbase;
        if (!urlbase) return console.warn("bing api", res);

        const file = `${Cache}/${urlbase.replace("/th?id=", "")}.jpg`;

        if (dependencies("curl")) {
            Utils.ensureDirectory(Cache);
            await sh(
                `curl "${"https://www.bing.com" + urlbase + "_" + options.wallpaper.resolution + ".jpg"}" --output ${file}`
            );
            this.#setWallpaper(file);
        }
    }

    readonly random = () => {
        this.#fetchBing();
    };
    readonly set = (path: string) => {
        this.#setWallpaper(path);
    };
    get wallpaper() {
        return WP;
    }

    constructor() {
        super();

        if (!dependencies("swww")) return this;

        // gtk portal
        Utils.monitorFile(WP, () => {
            if (!this.#blockMonitor) this.#wallpaper();
        });

        Utils.execAsync("swww-daemon")
            .then(this.#wallpaper)
            .catch(() => null);
    }
}

const wallpaper = new Wallpaper();
Object.assign(globalThis, { wallpaper });
export default wallpaper;
