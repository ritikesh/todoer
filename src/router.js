
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Login from './components/Login'
import AppForm from './components/App/Form'
import ItemForm from './components/App/ItemForm'
import Item from './components/App/Item'

Vue.use(Router)

function requireAuthor (to, from, next) {
  if (!store.state.session) { /// THIS NOT WORK, HOW TO ACCESS STORE?
    next('/')
  } else {
    next()
  }
}

const router = new Router({
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
      component: AppForm,
      beforeEnter: requireAuthor
    },
    {
      path: 'apps/:appId/edit',
      name: 'edit-app',
      component: AppForm,
      beforeEnter: requireAuthor
    },
    {
      path: 'app/:appId/new',
      name: 'add-item',
      component: ItemForm,
      beforeEnter: requireAuthor
    },
    {
      path: 'app/:appId/:itemId/edit',
      name: 'edit-item',
      component: ItemForm,
      beforeEnter: requireAuthor
    },
    {
      path: 'app/:appId/:itemId',
      name: 'show-item',
      component: Item,
      beforeEnter: requireAuthor
    },
    {
      path: '*',
      component: Login
    }
  ]
})

export default router