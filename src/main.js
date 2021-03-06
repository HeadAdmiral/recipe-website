import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false;

/**
 * Creates the Vue instance
 */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
