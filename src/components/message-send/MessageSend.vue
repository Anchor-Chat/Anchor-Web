<template web>
	<div class="message-send">
		<i class="material-icons">attachment</i>
		<div class="input-field">
			<input
				type="text"
				@keydown.alt="fetch()"
				@keydown.enter="send()"
				v-model="text"
				class="validate"
			/>
		</div>
		<i class="material-icons">tag_faces</i>
	</div>
</template>

<script lang="ts">
import ChannelList from "../channel-list/index.vue";

import { Component, Prop, Vue } from "vue-property-decorator";
import $ from "jquery";
import { AnchorAPI, TextChannel } from "@anchor-chat/anchor-api";

@Component({
	name: "message-send"
})
export default class MessageSend extends Vue {
	text: string = "";

	mounted() {}

	get api() {
		return <AnchorAPI>this.$store.state.api;
	}

	get activeChannel() {
		return <TextChannel>this.$store.state.activeChannel;
	}

	send() {
		if (this.text === "") return;

		this.activeChannel.send(this.text);
		this.text = "";

		setTimeout(() => {
			let scroller = $("#message-scroller");
			scroller.scrollTop(scroller.prop("scrollHeight"));
			//this.$parent.fetchMessages();
		}, 500);
	}

	fetch() {
		(<any>this.$parent).fetchMessages();
	}
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
