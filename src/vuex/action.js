/**
 * Created by lenovo on 2017/9/19.
 */
export default {
  saveWorkIconData ({commit}, type) {
    commit('MT_WORKINCONDATA', type)
  },
  getGroupDict ({commit}, type) {
    commit('MT_ENDDICT', type)
  },
  getSelfModuleDict ({commit}, type) {
    commit('MT_SELFMODULRDICT', type)
  },
  changeCount ({commit}) {
    setTimeout(() => {
      commit('count')
    }, 1000)
  },
  setSpId({commit}){
    commit('SET_SPID')
  }
}
