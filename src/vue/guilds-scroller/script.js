export default {
	name: "guilds-scroller",
	methods: {
		isImageUrl: function(str) {
			return str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/);
		} 
	},
	data () {
		return this.$parent.$data;
	}
};