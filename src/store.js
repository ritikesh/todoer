import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState({
            key: "checker_app_v1"
        })
    ],
    state: {
        apps: [
        ],
        author: null,
        session: null
    },
    mutations: {
        setAuthor (state, author) {
            state.author = author
            state.session = !!(author)
        },
        setApp(state, app) {
            const apps = state.apps
            if(app.id == undefined) {
                app.id = apps.length
                apps.push(app)
            } else {
                apps[app.id] = app
            }
        },
        setItem(state, item) {
            const app = state.apps[item.appId]
            if(app == undefined) return
            const items = app.items
            item.id = items.length
            items.push(item)
        },
        logout(state) {
            state.apps = []
            state.author = null
            state.session = null
        }
    },
    actions: {
        setAuthor ({commit}, author) {
            commit('setAuthor', author)
        },
        setApp({commit}, app) {
            commit('setApp', app)
        },
        setItem({commit}, item) {
            commit('setItem', item)
        },
        logout({commit}) {
            commit('logout')
        }
    }
})