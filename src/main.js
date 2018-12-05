import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'

Vue.use(VueFire);
firebase.initializeApp({
    apiKey: "AIzaSyD9TRsF2G3dwp6O5Bwb8AzyGonN97HrC8M",
    authDomain: "recipely-d00fd.firebaseapp.com",
    databaseURL: "https://recipely-d00fd.firebaseio.com",
    projectId: "recipely-d00fd",
    storageBucket: "recipely-d00fd.appspot.com",
    messagingSenderId: "685698981441"
});

export const database = firebase.firestore();

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
