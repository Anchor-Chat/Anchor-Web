<template web>
	<div id="channel-list">
		<div class="header">
			<div>{{ serverName }}</div>
		</div>
		<router-link
			v-for="(channel) in [{id: 0, name: 'XD'}]"
			:key="channel.id"
			:to="`/channels/0/${channel.id}`"
		>
			<div class="channel">
				<awesome-icon icon="hashtag"></awesome-icon>
				<span>{{ channel.name }}</span>
			</div>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "channel-list"
})
export default class ChannelList extends Vue {
	get serverName(): string {
		return (this.$store.state.activeServer || {}).name || "";
	}
}
</script>

<style lang="scss" scoped>
@import "~styles/vars";

.header {
	width: 100%;
	height: 45px;
	background-color: $s-dark;
	display: inline-block;
	div {
		margin-top: 13px;
		margin-left: 15px;
		font-weight: bold;
		font-size: 19px;
		white-space: nowrap;

		-moz-user-select: none;
		-ms-user-select: none;
		-webkit-user-select: none;
		user-select: none;
	}
}

#channel-list {
	width: 240px;
	background-color: $s-light;

	.channel:first-child {
		margin-top: 20px;
	}

	.channel {
		padding-left: 15px;
		padding-top: 7px;
		padding-bottom: 7px;

		color: $add-color;

		svg {
			font-style: italic;
			font-size: 16px;
		}

		span {
			font-size: 16px;
			margin-left: 5px;
		}

		// -moz-user-select: text;
		// -ms-user-select: text;
		// -webkit-user-select: text;
		// user-select: text;
	}

	.channel:hover {
		color: white;
	}
}

.active {
	background-color: $p-light;
}
</style>
