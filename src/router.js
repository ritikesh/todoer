
import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import AddApp from './components/AddApp'
import EditApp from './components/EditApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/apps/new',
      name: 'add-app',
      component: AddApp
    },
    {
      path: 'apps/:appId/edit',
      name: 'app-edit',
      component: EditApp
    },
    {
      path: '*',
      component: Login
    }
  ]
})