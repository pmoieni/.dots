import app from "ags/gtk4/app"
import style from "./style/style.scss"
import Bar from "./widgets/bar"

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)
  },
})
