<template web>
	<div id="channel-list">
		<modal
			name="add-dm"
			height="auto"
			@clickToClose="true"
		>
			<input v-model="dmAddLogin">
			<input
				type="button"
				value="Ok"
				@click="addUser()"
			>
		</modal>

		<div class="header" />

		<div class="separator">
			{{ $t("dm_list.title") }}
			<i
				class="material-icons"
				@click="showDialog()"
			>add_circle_outline</i>
		</div>

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
import { DMChannel, AnchorAPI } from '@anchor-chat/api';
import { EventEmitter } from 'events';
import ChannelList from './ChannelList.vue';

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

	dmAddLogin = '';

	mounted() {
		const f = (args) => {
			const api = args as AnchorAPI;

			this.fetchData(api);
			api.on('dmChannelUpdate', () => {
				this.fetchData(api);
			});
		};

		if (!this.api) {
			this.$root.$on('apiReady', f);
		} else {
			f(this.api);
		}
	}

	fetchData(api) {
		console.log('Fetch DMs');
		this.channels = api.getDMChannels();
		this.channelSelect();
	}

	showDialog() {
		this.$modal.show('add-dm');
	}

	addUser() {
		this.$modal.hide('add-dm');

		this.api.getUserData(this.dmAddLogin).then(user => {
			setTimeout(() => user.createDM(), 500);
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

div.vm--modal {
	align-content: center;
	input {
		width: 300px;
		margin-left: 30px;
		margin-right: auto;
	}
}

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

	.separator {
		color: $add-color;

		text-align: left;
		vertical-align: middle;
		padding-top: 15px;
		padding-left: 16px;

		i {
			float: right;
			padding-right: 10px;
			margin-top: -4px;
		}

		i:hover {
			cursor: pointer;
		}
	}

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
