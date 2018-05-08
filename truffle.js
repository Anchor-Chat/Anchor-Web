module.exports = {
	networks: {
		dev: {
			host: "127.0.0.1",
			port: 7777,
			network_id: "*" // Match any network id
		},
		live: {
			host: "127.0.0.1",
			port: 8545,
			network_id: "1"
		}		
	}
};