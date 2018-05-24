import Utils from "../../utils.js";

export default {
	name: "channel-list",
	props: ["serverName"],
	computed: {
		guildName: function() {
			let guild = Utils.getGuildById(this.$parent.$parent, this.$route.params.guildId);
			let name = guild.name.substring(0, 21);
			if (name.length >= 21) name+="...";
			return name;
		}
	},
	data () {
		return {
			guild: Utils.getGuildById(this.$parent.$parent, this.$route.params.guildId)
		};
	}
};