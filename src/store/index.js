import Vue from "vue";
import Vuex from "vuex";
import block from "./modules/block";
import vkapp from "./modules/vkapp";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  mutations: {},
  state: {},
  getters: {},

  modules: {
    block,
    vkapp
  }
});
