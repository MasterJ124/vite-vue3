import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

import {qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	}
];

const router = createRouter({
	history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vite-app' : '/'),
	routes
});

export default router;