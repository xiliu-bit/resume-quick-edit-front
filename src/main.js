import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 这里引入全局样式会导致重复加载，所以注释掉
// [plugin:vite:css] [sass] Module loop: this module is already being loaded.
// import "./assets/styles//variables.scss";

// 初始化PDFMake
import { initializePDFMake } from "./utils/pdf-init";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

// 初始化PDF生成功能
const initPDF = async () => {
  try {
    console.log('🔧 开始PDF初始化...')
    await initializePDFMake()


    console.log('✅ PDF初始化完成')
  } catch (error) {
    console.error('❌ PDF初始化失败:', error)
  }
}

// 在应用启动后初始化PDF
app.mount("#app");
initPDF();
