import { createApp } from 'vue'
import App from './App.vue';
import vueRouter from './router';

import {renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let router = null;
let instance: any = null;

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
 function render(props: any) {
	const { container } = props;
	// 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
	router = vueRouter;

	// 挂载应用
	instance = createApp(App).use(router)
  instance.mount(container ? container.querySelector('#vite-app') : '#vite-app')
}

// 独立运行时，直接挂载应用
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}

renderWithQiankun({
  mount(props) {
    console.log('ViteMicroApp mount');
    render(props);
  },
  bootstrap() {
    console.log('ViteMicroApp bootstrap');
  },
  unmount(props: any) {
    console.log('ViteMicroApp unmount');
    instance.unmount()
    instance = null
	  router = null
  },
  update(){
    console.log('ViteMicroApp update');
  }
})
