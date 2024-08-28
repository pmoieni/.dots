import { sh } from "lib/utils";

type Mode = "Hybrid" | "Integrated";

// TODO: requires root password
class Supergfxctl extends Service {
    static {
        Service.register(
            this,
            {},
            {
                mode: ["string", "r"],
            }
        );
    }

    get available() {
        return Utils.exec(
            "which supergfxctl",
            () => true,
            () => false
        );
    }

    #mode: Mode = "Hybrid";

    async nextMode() {
        await sh(
            `supergfxctl -m ${this.#mode === "Hybrid" ? "Integrated" : "Hybrid"}`
        );
        this.#mode = (await sh("supergfxctl -g")) as Mode;
        this.changed("mode");
    }

    constructor() {
        super();

        if (this.available) {
            sh("supergfxctl -g").then((m) => (this.#mode = m as Mode));
        }
    }

    get mode() {
        return this.#mode;
    }
}

export default new Supergfxctl();
