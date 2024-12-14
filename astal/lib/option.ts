import { GLib, monitorFile, readFile, writeFile } from "astal"
import { Variable } from "astal/variable"
import { ensureDirectory } from "./utils"

function writeFileWithParents(path: string, content: string) {
    const dir = path.substring(0, path.lastIndexOf("/"))
    ensureDirectory(dir)
    return writeFile(path, content)
}

export class Opt<T = unknown> extends Variable<T> {
    private initial: T

    constructor(initial: T) {
        super(initial)
        this.initial = initial
    }

    key: string = ""

    get value() {
        return this.get()
    }

    set value(v: T) {
        this.set(v)
    }

    init(cacheFile: string) {
        let cacheV
        if (GLib.file_test(cacheFile, GLib.FileTest.EXISTS)) {
            cacheV = JSON.parse(readFile(cacheFile) || "{}")[this.key]
        }

        if (cacheV !== undefined) this.set(cacheV)

        this.subscribe(() => {
            const cache = JSON.parse(readFile(cacheFile) || "{}")
            cache[this.key] = this.get()
            writeFileWithParents(cacheFile, JSON.stringify(cache, null, 2))
        })
    }

    reset() {
        if (JSON.stringify(this.get()) !== JSON.stringify(this.initial)) {
            this.set(this.initial)
            return this.key
        }
    }
}

export const opt = <T>(initial: T) => new Opt(initial)

function getOptions(object: object, path = ""): Opt[] {
    return (Object.keys(object) as Array<keyof typeof object>).flatMap(
        (objKey) => {
            const obj: Opt = object[objKey]
            const key = path ? path + "." + objKey : objKey

            if (obj instanceof Opt) {
                obj.key = key
                return obj
            }

            if (typeof obj === "object") return getOptions(obj, key)

            return []
        }
    )
}

export function mkOptions<T extends object>(cacheFile: string, object: T) {
    for (const opt of getOptions(object)) opt.init(cacheFile)

    const configFile = `${TMP}/config.json`
    const values = getOptions(object).reduce(
        (obj, { key, value }) => ({ [key]: value, ...obj }),
        {}
    )
    writeFileWithParents(configFile, JSON.stringify(values, null, 2))
    monitorFile(configFile, () => {
        const cache = JSON.parse(readFile(configFile) || "{}")
        for (const opt of getOptions(object)) {
            if (JSON.stringify(cache[opt.key]) !== JSON.stringify(opt.value))
                opt.value = cache[opt.key]
        }
    })

    return Object.assign(object, {
        configFile,
        array: () => getOptions(object),
        handler(deps: string[], callback: () => void) {
            for (const opt of getOptions(object)) {
                if (deps.some((i) => opt.key.startsWith(i)))
                    opt.subscribe(callback)
            }
        },
    })
}
