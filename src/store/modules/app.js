
const app = {
  state: {
    collapsed: true
  },

  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.collapsed = !state.collapsed
    }
  },

  actions: {
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
