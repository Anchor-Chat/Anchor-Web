<template web>
	<div class="row h-100 no-margin">
		<server-scroller class="col-fixed-70 h-100"></server-scroller>
		<router-view name="list-sidebar" class="col-fixed-240 h-100"></router-view>
		<div class="row col-md-12 no-gutters h-100 offset-310">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import ServerScroller from "components/ServerScroller.vue";
import ChannelList from "components/ChannelList.vue";

import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({
	components: {
		ServerScroller,
		ChannelList
	}
})
export default class UserspaceView extends Vue {
	
}
</script>

<style lang="scss" scoped>
</style>
