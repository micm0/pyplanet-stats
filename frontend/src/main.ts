import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/store";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import messages from "./locales/messages.json";

Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
