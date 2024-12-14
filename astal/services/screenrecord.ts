import { icons } from "@assets/icons"
import { dependencies, ensureDirectory } from "@lib/utils"
import {
    AstalIO,
    execAsync,
    GLib,
    GObject,
    interval,
    property,
    register,
    subprocess,
} from "astal"

const now = () => GLib.DateTime.new_now_local().format("%Y-%m-%d_%H-%M-%S")

@register({ GTypeName: "Screenrecord" })
export default class Screenrecord extends GObject.Object {
    static instance: Screenrecord
    static get_default() {
        if (!this.instance) this.instance = new Screenrecord()

        return this.instance
    }

    #recordings = `${GLib.get_home_dir()}/Videos/Recordings`
    #screenshots = `${GLib.get_home_dir()}/Pictures/Screenshots`
    #file = ""
    #recorder: AstalIO.Process | null = null
    #interval: AstalIO.Time | null = null

    @property(Number)
    declare timer: number

    @property(Boolean)
    get recording() {
        return !!this.#recorder
    }

    async start(full = true, recordAudio = false) {
        if (this.recording) return

        ensureDirectory(this.#recordings)
        this.#file = `${this.#recordings}/${now()}.mp4`

        let cmd: string

        if (full) {
            cmd = `wf-recorder ${recordAudio ? "-a" : ""} -f ${this.#file}`
        } else {
            const size = await execAsync("slurp")
            if (!size) return

            cmd = `wf-recorder ${recordAudio ? "-a" : ""} -g "${size}" -f ${this.#file}`
        }

        this.#recorder = subprocess(cmd)
        this.notify("recording")

        this.timer = 0
        this.#interval = interval(1000, () => {
            this.timer++
        })
    }

    async stop() {
        if (!this.#recorder) return

        try {
            this.#recorder.signal(15)
            this.#recorder = null
            this.notify("recording")

            if (this.#interval) this.#interval.cancel()
            this.timer = 0

            const res = await execAsync([
                "notify-send",
                "-a",
                "Screenrecord",
                "-i",
                icons.ui.video,
                "-A",
                "file=Show in Files",
                "-A",
                "view=View",
                "Screenrecord",
                this.#file,
            ])

            switch (res) {
                case "file":
                    return execAsync([
                        GLib.getenv("FILE_MANAGER") || "xdg-open",
                        this.#recordings,
                    ])
                case "view":
                    return execAsync(["xdg-open", this.#file])
            }
        } catch (e) {
            console.error("Error executing screenrecord-end script:", e)
        }
    }

    async screenshot(full = true) {
        ensureDirectory(this.#screenshots)
        const file = `${this.#screenshots}/${now()}.png`

        if (full) {
            await execAsync(`grim "${file}"`)
        } else {
            const size = await execAsync("slurp")
            if (!size) return

            await execAsync(`grim -g "${size}" "${file}"`)
        }

        const res = await execAsync([
            "notify-send",
            "-a",
            "Screenrecord",
            "-A",
            "file=Show in Files",
            "-A",
            "view=View",
            "-A",
            "edit=Edit",
            `--hint=string:image-path:${file}`,
            "Screenrecord",
            file,
        ])

        switch (res) {
            case "file":
                return execAsync([
                    GLib.getenv("FILE_MANAGER") || "xdg-open",
                    this.#screenshots,
                ])
            case "view":
                return execAsync(["xdg-open", file])
            case "edit":
                return execAsync(`swappy -f ${file}`)
        }
    }

    constructor() {
        if (!dependencies("wf-recorder", "slurp", "grim", "swappy", "swappy"))
            return

        super()

        this.timer = 0
    }
}
