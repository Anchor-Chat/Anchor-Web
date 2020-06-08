import Vue from 'vue';
import App from '~/App.vue';
import router from './router';
import store from './store';

import { library as fontAwesome } from '@fortawesome/fontawesome-svg-core';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap';
import 'materialize-css';

import './styles/style';

import './serviceWorker';

import VModal from 'vue-js-modal';
import i18n from './i18n';

Vue.use(VModal);

fontAwesome.add(faHashtag);

Vue.component('awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App)
}).$mount('#app');
