import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
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
    getters: {
        getTodoList: (state) => (appId) => {
            return state.apps[appId].todoList.split(",")
        },
        cloneObject: (state) => (obj) => {
            return JSON.parse(JSON.stringify(obj));
        }
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
            if(item.id == undefined) {
                item.id = items.length
                items.push(item)
            } else {
                items[item.id] = item
            }
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

export default store