import { Binding, Variable } from "astal";
import { Widget } from "astal/gtk3";
import { getIcon, icons } from "@assets/icons";

export interface ToggleButtonProps extends Widget.ButtonProps {
  onToggled?: () => void;
  state?: Binding<boolean> | boolean;
  child?: JSX.Element;
}

export function ToggleButton({
  state = false,
  onToggled,
  setup,
  child,
  ...props
}: ToggleButtonProps) {
  const innerState = Variable(state instanceof Binding ? state.get() : state);

  return (
    <button
      hexpand
      setup={(self) => {
        setup?.(self);

        self.toggleClassName("active", innerState.get());
        self.hook(innerState, () =>
          self.toggleClassName("active", innerState.get()),
        );

        if (state instanceof Binding) {
          self.hook(state, () => innerState.set(state.get()));
        }
      }}
      onClicked={onToggled}
      className="toggle-button"
      {...props}
    >
      {child}
    </button>
  );
}

export interface ArrowToggleButtonProps extends Widget.BoxProps {
  onToggled?: () => void;
  onActivate?: () => void;
  state?: Binding<boolean> | boolean;
  child?: JSX.Element;
}

export function ArrowToggleButton({
  state = false,
  onToggled,
  onActivate,
  setup,
  child,
  ...props
}: ArrowToggleButtonProps) {
  const innerState = Variable(state instanceof Binding ? state.get() : state);

  return (
    <box
      setup={(self) => {
        setup?.(self);

        self.toggleClassName("active", innerState.get());
        self.hook(innerState, () =>
          self.toggleClassName("active", innerState.get()),
        );

        if (state instanceof Binding) {
          self.hook(state, () => innerState.set(state.get()));
        }
      }}
      className="arrow-button"
      {...props}
    >
      <button hexpand onClicked={onToggled}>
        {child}
      </button>
      {onActivate && (
        <button onClicked={onActivate}>
          <icon icon={getIcon(icons.arrow.right)} />
        </button>
      )}
    </box>
  );
}
