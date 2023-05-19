const state = {
    adminInfo: {}

}
const getters = {

}
const mutations = {
    setAdminInfo(state, info) {
        console.log('mutations info', info)
        state.adminInfo = info
    }

}
const actions = {
    setAdminInfo({ commit }, info) {
        commit('setAdminInfo', info)
    }

}
const adminStore = {
    state,
    getters,
    mutations,
    actions,
}
export default adminStore