import { bind, Variable } from "astal"
import Network from "gi://AstalNetwork"
import Wp from "gi://AstalWp"

export const scrimWindowNames = Variable<Array<string>>([])

const wp = Wp.get_default()!

const mic = wp.defaultMicrophone
export const micIcon = bind(mic, "volumeIcon")

const speaker = wp.defaultSpeaker
export const speakerIcon = bind(speaker, "volumeIcon")

const network = Network.get_default()
const primary = bind(network, "primary")
const wifi = bind(network, "wifi")
const wired = bind(network, "wired")

export const networkIcon = Variable.derive(
    [primary, wifi, wired],
    (primary, wifi, wired) => {
        switch (primary) {
            case Network.Primary.WIRED:
                return wired.iconName
            default:
                return wifi.iconName
        }
    }
)
