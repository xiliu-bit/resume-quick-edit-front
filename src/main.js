import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 这里引入全局样式会导致重复加载，所以注释掉
// [plugin:vite:css] [sass] Module loop: this module is already being loaded.
// import "./assets/styles//variables.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
