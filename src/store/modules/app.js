
const app = {
  state: {
    count: 10
  },

  mutations: {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
  },

  actions: {
    increment: ({commit}) => {
      commit('INCREMENT')
    },
    decrement:  ({commit}) => {
      commit('DECREMENT')
    }
  }
}

export default app
