<template web>
	<div class="message-send">
		<i class="material-icons">attachment</i>
		<div class="input-field">
			<input type="text" id="message-text" class="validate" />
		</div>
		<i class="material-icons">tag_faces</i>
	</div>
</template>

<script lang="ts">
import ChannelList from "../channel-list/index.vue";

import { Component, Prop, Vue } from "vue-property-decorator";
import $ from "jquery";

@Component({
	name: "message-send"
})
export default class MessageSend extends Vue {
	mounted() {
		$("#message-text").on("keydown", e => {
			if (e.key === "Enter") {
				this.send();
			}
		});
	}

	send() {
		let messagesDom = $(".messages");
		let textDom = $("#message-text");
		let text = textDom.val();
		textDom.val("");

		setTimeout(() => {
			messagesDom.scrollTop(messagesDom.prop("scrollHeight"));
		}, 500);
	}
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
