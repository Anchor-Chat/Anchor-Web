import Vue from 'vue';
import App from '~/App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import "bootstrap";
import "materialize-css";

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
