import { createApp } from "vue";
import PreviewAll from "./PreviewAll.vue";
// 尝试按需注册 vant 组件（若需要更多组件可在此添加）
import { Button as VanButton, Image as VanImage } from "vant";
import ElementUI from 'element-plus';
// 尝试导入 vant 全局样式，若项目中使用不同路径，可调整
import "vant/lib/index.css";
import 'element-plus/dist/index.css'

const app = createApp(PreviewAll);
app.use(VanButton as any);
app.use(VanImage as any);
app.use(ElementUI );
app.mount("#app");
