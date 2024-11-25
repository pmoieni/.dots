import GObject from "gi://GObject";
import { Gtk, astalify, type ConstructProps } from "astal/gtk3";

export default class Revealer extends astalify(Gtk.Revealer) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<Revealer, Gtk.Revealer.ConstructorProps, {}>,
  ) {
    super(props as any);
  }
}
