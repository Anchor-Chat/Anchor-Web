<template web>
	<div class="message-send">
		<i class="material-icons">attachment</i>
		<div class="input-field">
			<input
				v-model="text"
				type="text"
				class="validate"
				@keydown.alt="fetch()"
				@keydown.enter.exact="send()"
			>
		</div>
		<i class="material-icons">tag_faces</i>
	</div>
</template>

<script lang="ts">
import ChannelList from '../channel-list/index.vue';

import { Component, Prop, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import { AnchorAPI, TextChannel } from '@anchor-chat/api';
import MessageView from '../../views/MessageView.vue';

@Component({
	name: 'message-send'
})
export default class MessageSend extends Vue {
	text = '';

	// mounted() {}

	get api() {
		return this.$store.state.api;
	}

	get activeChannel() {
		return this.$store.state.activeChannel;
	}

	send() {
		if (this.text === '') return;

		this.activeChannel.send(this.text);
		this.text = '';

		setTimeout(() => {
			const scroller = $('#message-scroller');
			scroller.scrollTop(scroller.prop('scrollHeight'));
			// this.$parent.fetchMessages();
			this.fetch();
		}, 500);
	}

	fetch() {
		(this.$parent as MessageView).fetchMessages();
	}
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
