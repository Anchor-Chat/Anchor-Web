pragma solidity ^0.4.23;

import "./Storage.sol";

contract Decentracord {
	
	Storage public dataStore;

	constructor(address storageAddress) public {
		dataStore = Storage(storageAddress);
	}
	
	function createServer(string serverName) external returns (bytes32) {
		bytes32 serverId = keccak256(msg.sender, block.number);
		dataStore.setBytes32(keccak256("server.id", serverId), serverId);
		dataStore.setString(keccak256("server.name", serverId), serverName);
		return serverId;
	}
	
}
