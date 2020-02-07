import Vue from "vue";
import App from "./App";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import mixin from "./assets/mixin";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.prototype.$eventBus = new Vue();
Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.mixin({
  methods: {
    generateId: mixin.generateId,
    random: mixin.random,
    console: mixin.console,
    getQueryParams: mixin.getQueryParams
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
