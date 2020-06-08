<template>
	<div class="message-view col-sm-12">
		<div class="topbar" />

		<div class="messages">
			<div
				id="message-scroller"
				class="scroller"
			>
				<div
					v-for="(message, i) in messages"
					:key="i"
					:class="{'notSameAuthor': !hasSameAuthorPrev(i, message)}"
					class="message"
				>
					<img
						v-if="!hasSameAuthorPrev(i, message,)"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWB6W7GLsVLLDYp72NtIGnB4r1aJVpVnOed17IB2abKLY_8tAl#.png"
					>
					<div class="content">
						<div
							v-if="!hasSameAuthorPrev(i, message)"
							class="author"
						>
							{{ message.author.login }}
						</div>
						<br>
						<div class="text">
							{{ message.content }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<message-send />
	</div>
</template>

<script lang="ts">
import MessageSend from 'components/message-send/MessageSend.vue';
import $ from 'jquery';

import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { AnchorAPI, Message, TextChannel } from '@anchor-chat/api';

@Component({
	components: {
		MessageSend
	}
})
export default class MessageView extends Vue {
	messages: Message[] = [];

	get api(): AnchorAPI {
		return this.$store.state.api;
	}

	get activeChannel(): TextChannel {
		return this.$store.state.activeChannel;
	}

	@Watch('$route')
	async fetchMessages() {
		if (this.activeChannel != null) {
			console.log('Fetch!');
			this.messages = Array.from(await this.activeChannel.messages.fetchMessages({ limit: -1 }));
		}
	}

	hasSameAuthorPrev(i: number, message: Message): boolean {
		const msgs = this.messages;
		return i === 0 || !msgs[i - 1]
			? false
			: msgs[i - 1].author.login === message.author.login;
	}

	mounted() {
		const f = () => {
			this.fetchMessages();
		};
		this.$root.$on('activeChannelChange', f);
		if (this.activeChannel) f();

		this.$nextTick(() => {
			const messagesDom = $('.messages');
			const guildViewDom = $('.guild-view');
			const topbarDom = $('.topbar');
			const messageSendDom = $('.message-send');

			setTimeout(() => {
				messagesDom.scrollTop(messagesDom.prop('scrollHeight'));
			}, 2000);

			if (guildViewDom && topbarDom && messageSendDom) {
				setInterval(() => {
					const h1 = guildViewDom.height();
					const h2 = topbarDom.height();
					const h3 = messageSendDom.height();
					if (h1 && h2 && h3) {
						messagesDom.css('height', h1 - h2 - h3 + 'px');
					}
				}, 500);
			}
		});

		this.$root.$on('apiReady', args => {
			const api = (args[0] as AnchorAPI) || this.api;

			api.on('messageChange', e => {
				console.log(e);
				if (e === this.activeChannel) {
					this.fetchMessages();
				}
			});
		});
	}
}
</script>

<style lang="scss" scoped>
@import "~styles/vars";
@import "components/message-send/style.scss";

$tb-height: 45px;

.topbar {
	width: 100%;
	height: $tb-height;

	background-color: $s-dark;
}

br {
	display: none;
}

.message-view {
	height: 100%;

	.messages {
		overflow: hidden;

		.scroller {
			overflow-y: scroll;
			overflow-x: hidden;

			width: calc(100% + 88px);
			height: 100%;
		}

		height: calc(100% - #{$tb-height} - #{$o-height});
	}
}

.notSameAuthor {
	margin-left: 25px !important;
	margin-top: 15px !important;
}

.message {
	display: flex;

	margin-left: 90px;
	margin-top: 0px;

	width: 100%;

	img {
		width: 40px;
		height: 40px;

		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		border-radius: 50%;

		box-shadow: 0 0 0 3px $secondary-color;

		margin-right: 25px;
	}

	.content {
		width: calc(100% - 180px);

		-moz-user-select: text;
		-ms-user-select: text;
		-webkit-user-select: text;
		user-select: text;

		.author {
			font-weight: bold;
			margin-top: 10px;

			font-size: 15px;
		}

		.text {
			margin-top: 16px;

			color: #d3d3d3;

			p {
				margin-bottom: 5px;
			}
		}
	}
}

.message:last-child {
	margin-bottom: 25px;
}
</style>
