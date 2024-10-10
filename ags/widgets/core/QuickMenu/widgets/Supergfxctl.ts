import { SimpleToggleButton } from "../../../shared/ToggleButton";
import icons from "lib/icons";

import supergfxctl from "services/supergfxctl";

export const SupergfxctlToggle = () =>
    SimpleToggleButton({
        icon: icons.graphicsCards,
        label: supergfxctl.bind("mode"),
        connection: [supergfxctl, () => supergfxctl.available],
        toggle: supergfxctl.nextMode,
    });
