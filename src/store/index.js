import Vue from 'Vue'
import vuex from 'vuex'

Vue.use(vuex)

const store = new vuex.Store({
    state: {
        scode: 11,
    },
    getters: {
        scodes(state) {
            return state.scode
        }
    },
    mutations: {
        changeScode(state, val) {
            state.scode = val
        }
    },
    actions: {
        updataScode(context, val) {
            context.commit('changeScode', val)
        }
    }
})


export default store