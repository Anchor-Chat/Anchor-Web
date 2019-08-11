<template web>
	<div class="login">
		<span class="title">Welcome!</span>
		<div class="block">
			<div>
				<h5>Login</h5>
				<input v-model="login"/>
			</div>
			<div class>
				<h5>Password</h5>
				<input type="password" v-model="password"/>
			</div>
			<button
				@click="submit()"
				class="btn waves-effect waves-light"
				type="submit"
			>{{ this.buttonText }}</button>
			<span class="lighter">{{ this.getText(0) }}</span>
			<span @click="toggle()" class="accent">{{ this.getText(1) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import App from '../App.vue';

@Component
export default class LoginView extends Vue {

	login = "";
	password = "";

	get state() {
		return this.$store.state.state;
	}

	get buttonText() {
		return this.getText(1, this.state == "LOGIN" ? "SIGNUP" : "LOGIN");
	}

	getText(i, v?) {
		let val;
		switch (v || this.state) {
			case "LOGIN":
				val = i == 0 ? "Need an account?" : "Sign up";
				break;
			case "SIGNUP":
				val = i == 0 ? "Already have an account?" : "Log in";
				break;
		}
		return val;
	}

	toggle() {
		switch (this.state) {
			case "LOGIN":
				this.$store.commit("CHANGE_STATE", "SIGNUP");
				break;
			case "SIGNUP":
				this.$store.commit("CHANGE_STATE", "LOGIN");
				break;
		}
	}

	async submit() {
		switch (this.state) {
			case "LOGIN":
				await this.$store.dispatch("login", {
					login: this.login,
					password: this.password
				});
				break;
			case "SIGNUP":
				await this.$store.dispatch("createAccount", {
					login: this.login,
					password: this.password
				});
				break;
		}

		this.$store.commit("CHANGE_STATE", "USERSPACE");
		console.log(this.$store.state.api)
		this.$parent.$emit("apiReady", this.$store.state.api);
		(<App>this.$parent).goTo("/@me");
	}
}
</script>


<style lang="scss" scoped>
@import "~styles/vars";

$padding: 40px;
$box-width: 480px;
$box-height: 424px;

.login {
	position: absolute;
	top: 50%;
	left: 50%;

	margin-top: -($box-height/2);
	margin-left: -($box-width/2);

	width: $box-width;
	height: $box-height;

	padding: $padding;

	background-color: $p-light;

	.title {
		display: block;
		text-align: center;

		margin-bottom: 8px;
		font-size: 26px;

		font-weight: 300;
	}

	.block {
		width: 100%;

		margin-top: 20px;

		span {
			display: block;
			margin-top: 4px;
			text-align: left;
			float: left;
			margin-right: 5px;
		}

		div {
			h5 {
				font-size: 12px;
				font-weight: 600;
			}
		}

		div:first-child {
			margin-bottom: 10px;
		}
	}

	button {
		width: 100%;
		margin-top: 44px;
		margin-bottom: 8px;
	}
}
</style>
