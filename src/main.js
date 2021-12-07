import { createApp } from "vue"
import { createI18n } from 'vue-i18n'
import App from "./App.vue"
import "@primer/css/utilities/index.scss"
import messages from "./locale.js"

const i18n = createI18n({
    locale: localStorage.getItem("lang") || "en-US",
    messages
})

const app = createApp(App)
app.use(i18n)
app.mount("#app")
