import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueFirestore from 'vue-firestore'
import Firebase from './modules/firebase'
import '@mdi/font/css/materialdesignicons.css'



Vue.use(VueFirestore)



Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
