<template web>
	<div id="channel-list">
		<div class="header" />
		<router-link
			v-for="(channel) in this.channels"
			:key="channel.id"
			:to="`/@me/${channel.id}`"
		>
			<div class="channel">
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWB6W7GLsVLLDYp72NtIGnB4r1aJVpVnOed17IB2abKLY_8tAl#.png"
				>
				<span>{{ channelName(channel) }}</span>
			</div>
		</router-link>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { DMChannel, AnchorAPI } from '@anchor-chat/anchor-api';
import { EventEmitter } from 'events';

@Component({
	name: 'dm-list'
})
export default class DMList extends Vue {
	get serverName(): string {
		return (this.$store.state.activeServer || {}).name || '';
	}

	get api(): AnchorAPI {
		return this.$store.state.api;
	}

	channels: DMChannel[] = [];

	// get dmChannels() {
	// 	return this.api ? await this.api.getDMChannels() : [];
	// }

	mounted() {
		const f = (args) => {
			const api = args[0] as AnchorAPI;

			this.fetchData(api);
			this.api.on('dmChannelCreate', () => {
				this.fetchData(api);
			});
		};

		if (!this.api) {
			this.$root.$on('apiReady', f);
		} else {
			f([this.api]);
		}
	}

	fetchData(api) {
		console.log('Fetch DMs');
		this.api.getDMChannels().then(channels => {
			this.channels = channels;
			this.channelSelect();
		});
	}

	channelName(channel: DMChannel) {
		return null || channel.members
			.map(m => m.login)
			.filter(e => e !== this.api.user.login)
			.reduce((prevVal, val, i, arr) => {
				console.log(arr);
				return i === 0 ? `${val}, ${prevVal}` : val;
			});
	}

	@Watch('$route')
	channelSelect() {
		if (this.$route.params.channel) {
			this.$store.commit('ACTIVE_CHANNEL', this.api.dmHelper.channels.get(this.$route.params.channel));
			this.$root.$emit('activeChannelChange');
		}
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
		height: 44px;
		width: 100%;

		color: $add-color;

		display: flex;
		flex-direction: row;
		align-items: center;

		img {
			width: 32px;
			height: 32px;

			margin-left: 16px;
			margin-right: 12px;

			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;

			box-shadow: 0 0 0 3px $secondary-color;
		}

		span {
			font-size: 16px;
			margin-left: 5px;
			padding-right: 16px;

			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
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
