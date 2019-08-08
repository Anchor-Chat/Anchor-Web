<template web>
	<div class="w-page">
		<!-- <login></login> -->
		<div class="row h-100">
			<server-scroller class="col-fixed-70 h-100"></server-scroller>
			<channel-list class="col-fixed-240 h-100"></channel-list>
			<div class="row col-md-12 no-gutters h-100 offset-310">
				<router-view class="col-sm-12"></router-view>
			</div>
		</div>
	</div>
</template>

<template native></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ServerScroller from "components/ServerScroller.vue";
import ChannelList from "components/ChannelList.vue";

const { VUE_APP_MODE } = process.env;

@Component({
	name: "home",
	components: {
		ServerScroller,
		ChannelList
	}
})
export default class App extends Vue {
	private navbarTitle: string = `App.vue`;

	public goToHomePage() {
		this.goTo("home");
	}

	public goToAboutPage() {
		this.goTo("about");
	}

	public goTo(route) {
		VUE_APP_MODE === "web"
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

.w-page > .row {
	margin: 0px;
}
</style>

<style native lang="scss">
@import "~styles/vars";

.w-page {
	height: 100%;
	width: 100%;
}
</style>
