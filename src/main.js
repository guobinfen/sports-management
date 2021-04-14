import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

<<<<<<< HEAD

createApp(App).use(store).use(router).mount('#app')
=======
createApp(App).use(store).use(router).use(ElementPlus, { locale }).mount('#app')
>>>>>>> origin/competition-pop
