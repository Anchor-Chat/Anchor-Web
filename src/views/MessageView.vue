<template>
	<div class="message-view">
		<div class="topbar"></div>

		<div class="messages">
			<div class="scroller">
				<div
					:class="{'notSameAuthor': !hasSameAuthorPrev(i, message)}"
					:key="i"
					class="message"
					v-for="(message, i) in messages"
				>
					<img
						v-if="!hasSameAuthorPrev(i, message)"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWB6W7GLsVLLDYp72NtIGnB4r1aJVpVnOed17IB2abKLY_8tAl#.png"
					/>
					<div class="content">
						<div v-if="!hasSameAuthorPrev(i, message)" class="author">{{ message.author }}</div>
						<br />
						<div class="text">{{ message.text }}</div>
					</div>
				</div>
			</div>
		</div>

		<message-send></message-send>
	</div>
</template>

<script lang="ts">
import MessageSend from "components/message-send/MessageSend.vue";

import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import $ from "jquery";

@Component({
	components: {
		MessageSend
	}
})
export default class MessageView extends Vue {
	messages: any[] = [
		{
			author: "l",
			text:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie felis ac blandit porttitor. Donec elementum, neque in consectetur scelerisque, purus libero pretium nunc, quis volutpat nulla nisl ut ipsum. Donec faucibus augue diam, accumsan efficitur tortor interdum imperdiet. Proin lobortis, massa quis faucibus auctor, odio arcu aliquet mi, vitae sagittis lacus nulla id mauris. Aenean dapibus ligula at finibus faucibus. In hac habitasse platea dictumst. Donec finibus, augue non laoreet molestie, nibh massa laoreet mauris, at malesuada sapien elit sed lacus. Vestibulum commodo ligula ac eros porttitor, at feugiat sapien gravida. Fusce ut augue commodo, efficitur massa in, placerat leo. Donec fringilla dolor quam, a convallis ex condimentum id. Aenean sit amet blandit ipsum."
		},
		{
			author: "l",
			text:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie felis ac blandit porttitor. Donec elementum, neque in consectetur scelerisque, purus libero pretium nunc, quis volutpat nulla nisl ut ipsum. Donec faucibus augue diam, accumsan efficitur tortor interdum imperdiet. Proin lobortis, massa quis faucibus auctor, odio arcu aliquet mi, vitae sagittis lacus nulla id mauris. Aenean dapibus ligula at finibus faucibus. In hac habitasse platea dictumst. Donec finibus, augue non laoreet molestie, nibh massa laoreet mauris, at malesuada sapien elit sed lacus. Vestibulum commodo ligula ac eros porttitor, at feugiat sapien gravida. Fusce ut augue commodo, efficitur massa in, placerat leo. Donec fringilla dolor quam, a convallis ex condimentum id. Aenean sit amet blandit ipsum."
		}
	];

	@Watch("$route")
	fetchData() {}

	hasSameAuthorPrev(i, message): boolean {
		return (this.messages[i - 1] || {}).author === message.author;
	}

	created() {
		this.fetchData();
	}

	mounted() {
		this.$nextTick(() => {
			let messagesDom = $(".messages");
			let guildViewDom = $(".guild-view");
			let topbarDom = $(".topbar");
			let messageSendDom = $(".message-send");

			setTimeout(() => {
				messagesDom.scrollTop(messagesDom.prop("scrollHeight"));
			}, 2000);

			if (guildViewDom && topbarDom && messageSendDom) {
				setInterval(() => {
					let h1 = guildViewDom.height();
					let h2 = topbarDom.height();
					let h3 = messageSendDom.height();
					if (h1 && h2 && h3) {
						messagesDom.css("height", h1 - h2 - h3 + "px");
					}
				}, 500);
			}
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
	overflow: hidden;

	height: 100%;

	.messages {
		.scroller {
			overflow-y: scroll;
			overflow-x: hidden;

			width: calc(100% + 88px);
		}

		height: calc(100% - #{$tb-height} - #{$o-height});
	}
}

.notSameAuthor {
	img {
		box-shadow: 0 0 0 3px $secondary-color;
	}
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
</style>
