const state = {
    userInfo: {}

}
const getters = {

}
const mutations = {
    setUserInfo(state, info) {
        console.log('mutations info', info)
        state.userInfo = info
    }

}
const actions = {
    setUserInfo({ commit }, info) {
        commit('setUserInfo', info)
    }

}
const userStore = {
    state,
    getters,
    mutations,
    actions,
}
export default userStore