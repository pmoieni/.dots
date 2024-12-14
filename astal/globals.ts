import { GLib } from "astal"

declare global {
    const OPTIONS: string
    const TMP: string
    const USER: string
}

Object.assign(globalThis, {
    OPTIONS: `${GLib.get_user_cache_dir()}/astal/options.json`,
    TMP: `${GLib.get_tmp_dir()}/astal`,
    USER: GLib.get_user_name(),
})
