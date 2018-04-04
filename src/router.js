
import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import AppForm from './components/App/Form'
import ItemForm from './components/App/ItemForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'default',
      path: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/apps/new',
      name: 'add-app',
      component: AppForm
    },
    {
      path: 'apps/:appId/edit',
      name: 'edit-app',
      component: AppForm
    },
    {
      path: 'app/:appId',
      name: 'add-item',
      component: ItemForm
    },
    {
      path: 'app/:appId/:itemId/edit',
      name: 'edit-item',
      component: ItemForm
    },
    {
      path: '*',
      component: Login
    }
  ]
})