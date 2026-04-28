import { createApp } from "vue"
import { createPinia } from "pinia"
import { startRouter } from "~/app/router"
import App from "./App"
import "./assets/styles.css"

const app = createApp(App)
app.use(createPinia())
startRouter()
app.mount("#app")
