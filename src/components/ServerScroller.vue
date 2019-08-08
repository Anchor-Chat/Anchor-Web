<template web>
<div class="server-scroller">
	<div class="scroller">
		<div class="server" v-for="(server) in [{ id:1, name: 'idk', img: 'add' }]" :key="server.id" :id="server.id" data-toggle="tooltip" data-placement="right" :title="server.name">
			<router-link :class="{'overflow': false}" class="waves-effect waves-light" draggable="false" :to="'/server/'+server.id">
				<img v-if="isImageUrl(server.img)"      :src="server.img">
				<i   v-else class="material-icons" >{{ server.img }}</i>
			</router-link>
		</div>
		<div class="server add-server" data-toggle="tooltip" data-placement="right" title="Add new server">
			<a class="button btn-floating btn-large waves-effect waves-light red">
				<i class="material-icons">add</i>
			</a>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
	name: "server-scroller"
})
export default class ServerScroller extends Vue {
	isImageUrl(str: string): RegExpMatchArray | null {
		return str.match(
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
		);
	}

	newServer() {
		// Utils.showDialog("", () => {
		// },
		// () => {
		// }, "New server", "Add server");
	}

	data() {
		return this.$parent.$data;
	}
}
</script>

<style lang="scss" scoped>
@import "~styles/vars";

$server-size: 50px;

.server-scroller {
	background-color: $p-light;

	width: 70px;

	overflow: hidden;

	.scroller {
		width: 88px;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	:first-child.server {
		margin-bottom: 10px;
	}
	:not(:first-of-type).server {
		margin-bottom: 5px;
		overflow: hidden;
		box-shadow: 0 0 0 3px $s-light;
	}
	.separator {
		margin-top: 5px;
		margin-left: 10px;
	}
}

.server.add-server {
	box-shadow: none !important;

	-webkit-border-radius: 0%;
	-moz-border-radius: 0%;
	border-radius: 0%;

	i {
		line-height: $server-size;
	}
}

.server {
	width: $server-size;
	height: $server-size;
	text-align: center;
	margin-left: 10px;
	margin-top: 10px;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
	a {
		width: $server-size - 2px;
		height: $server-size - 2px;
	}
	i {
		font-size: $server-size;
	}
	img {
		width: $server-size;
		height: $server-size;
	}
}
</style>
