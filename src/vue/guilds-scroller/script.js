export default {
	name: "guilds-scroller",
	methods: {
		hasImageUrl: function(guild) {
			/* eslint-disable-next-line no-undef */
			return guild.img.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(png|jpg|jpeg)/);
		} 
	},
	data () {
		return this.$parent.$data;
	}
};