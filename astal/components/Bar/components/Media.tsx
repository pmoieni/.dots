import Mpris from "gi://AstalMpris";
import { bind, Variable } from "astal";
import { Astal, Gtk } from "astal/gtk3";
import { Button } from "astal/gtk3/widget";
import { getIcon, icons } from "@assets/icons";
import options from "../../../options";

function Player({
  player,
  setup,
}: {
  player: Mpris.Player;
  setup?: (self: Button) => void;
}) {
  const title = bind(player, "title").as((t) => t || "Unknown Track");
  const artist = bind(player, "artist").as((a) => a || "Unknown Artist");

  const track = Variable.derive([title, artist], (t, a) => `${a} - ${t}`);

  const handle_click = (_self: Button, event: Astal.ClickEvent) => {
    switch (event.button) {
      case Astal.MouseButton.PRIMARY:
        return player.play_pause();
      case Astal.MouseButton.SECONDARY:
        return player.next();
      case Astal.MouseButton.MIDDLE:
        return player.previous();
      default:
        return player.play_pause();
    }
  };

  return (
    <button
      name={player.busName}
      setup={setup}
      className="player"
      onClickRelease={handle_click}
    >
      <label
        maxWidthChars={options.widgets.bar.media.length()}
        truncate
        label={track()}
      />
    </button>
  );
}

export default function Media() {
  const mpris = Mpris.get_default();
  const selectedPlayer = Variable<string>("");

  const changePlayer = (direction: number) => {
    const allPlayers = mpris.get_players();
    const index = allPlayers.findIndex(
      (p) => p.busName === selectedPlayer.get(),
    );
    selectedPlayer.set(
      allPlayers[(index + direction + allPlayers.length) % allPlayers.length]
        .busName,
    );
  };

  return (
    <centerbox
      className="bar-media horizontal"
      visible={bind(mpris, "players").as((ps) => ps.length > 0)}
    >
      <button
        visible={bind(mpris, "players").as((ps) => ps.length > 1)}
        onClicked={() => changePlayer(-1)}
      >
        <icon icon={getIcon(icons.arrow.left)} />
      </button>
      <stack
        transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
        transitionDuration={options.transition()}
        shown={selectedPlayer()}
        interpolateSize
      >
        {bind(mpris, "players").as((ps) =>
          ps.map((player, idx) => (
            <Player
              setup={() => {
                if (idx === 0) selectedPlayer.set(player.busName);
              }}
              player={player}
            />
          )),
        )}
      </stack>
      <button
        visible={bind(mpris, "players").as((ps) => ps.length > 1)}
        onClicked={() => changePlayer(1)}
      >
        <icon icon={getIcon(icons.arrow.right)} />
      </button>
    </centerbox>
  );
}
