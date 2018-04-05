import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const LOCAL_STORE_KEY = 'TodoEr_App_V1'

const store = new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState({
            key: LOCAL_STORE_KEY
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
        },
        exportState: (state) => {
            const exportableState = {
                apps: state.apps,
                author: state.author,
                session: state.session
            }
            return JSON.stringify(exportableState);
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
        deleteApp(state, appId) {
            state.apps.splice(appId, 1);
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
        deleteItem(state, item) {
            state.apps[item.appId].items.splice(item.id, 1);
        },
        importState(state, json_obj) {
            state.author = json_obj.author
            state.session = json_obj.session
            state.apps = json_obj.apps
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
        deleteApp({commit}, appId) {
            commit('deleteApp', appId)
        },
        setItem({commit}, item) {
            commit('setItem', item)
        },
        deleteItem({commit}, item) {
            commit('deleteItem', item)
        },
        importState({commit}, json_obj) {
            commit('importState', json_obj)
        },
        logout({commit}) {
            commit('logout')
        }
    }
})

export default store