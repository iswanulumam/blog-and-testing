import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseApiUrl: '',
    articles: []
  },
  mutations: {
    'SET_ARTICLE' (state, payload) {
      state.articles = payload
    }
  },
  actions: {
    getArticles ({ commit }) {
      // console.log(process.env.VUE_APP_BASE_URI)
      axios.get(`${process.env.VUE_APP_BASE_URI}/api/articles`)
        .then(response => {
          commit('SET_ARTICLE', response.data.data)
        }).catch(() => {
          swal('Oops!', 'Something wrong!', 'error')
        })
    }
  }
})
