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
        items: [
        ],
        author: null,
        session: null
    },
    mutations: {
        setAuthor (state, author) {
            state.author = author
            state.session = !!(author)
        },
        setItem(state, item) {
            const items = state.items || []
            items.push(item)
            state.items = items
        },
        logout(state) {
            state.items = []
            state.author = null
            state.session = null
        }
    },
    actions: {
        setAuthor ({commit}, author) {
            commit('setAuthor', author)
        },
        setItem({commit}, item) {
            commit('setItem', item)
        },
        logout({commit}) {
            commit('logout')
        }
    }
})