<template web>
	<div class="w-page">
		<!-- <login></login> -->
		<!-- <div class="row h-100">
			<server-scroller class="col-fixed-70 h-100"></server-scroller>
			<channel-list class="col-fixed-240 h-100"></channel-list>
			<div class="row col-md-12 no-gutters h-100 offset-310">
			</div>
		</div>-->
		<router-view />
	</div>
</template>

<template native></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ServerScroller from 'components/ServerScroller.vue';
import ChannelList from 'components/ChannelList.vue';

const { VUE_APP_MODE } = process.env;

@Component({
	name: 'app',
	components: {
		ServerScroller,
		ChannelList
	}
})
export default class App extends Vue {
	mounted() {
		if (sessionStorage) {
			const login = sessionStorage.getItem('login');
			const password = sessionStorage.getItem('password');

			if (login && password) {
				(async () => {
					await this.$store.dispatch('login', {
						login,
						password
					});

					this.$store.commit('CHANGE_STATE', 'USERSPACE');

					this.$parent.$emit('apiReady', this.$store.state.api);

					if (this.$route.path === '/login') this.goTo('/@me');
				})();
			} else {
				if (this.$route.path !== '/login') {
					this.goTo('/login');
				}
			}
		}
	}

	public goTo(route) {
		VUE_APP_MODE === 'web'
			? this.$router.push(route)
			: Vue.prototype.$navigator.navigate(route);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style web lang="scss">
@import "~styles/vars";

.w-page {
	height: 100%;
	width: 100%;
}
</style>

<style native lang="scss">
@import "~styles/vars";

.w-page {
	height: 100%;
	width: 100%;
}
</style>
