import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0,
    authen:false
  },
  mutations: {
    setCount(state, value){
      state.count = value;
    },
    setAuthen(state, value){
      state.authen = value;
    },
  },
  getters:{
    getCount(state){
      return state.count;
    },
    getAuthen(state){
      return state.authen;
    }
  },
  actions: {
    addCount(context){
      context.commit('setCount', this.getters.getCount+1);
    },
    delCount(context){
      context.commit('setCount', this.getters.getCount-1);
    },
    addAuthen(context, value){
      context.commit('setAuthen', value);
    }
  },
  modules: {
  }
})
