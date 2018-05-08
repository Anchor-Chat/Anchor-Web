pragma solidity ^0.4.23;

import "./Storage.sol";

contract Decentracord {
	
	Storage public dataStore;

	constructor(address storageAddress) public {
		dataStore = Storage(storageAddress);
	}
	
	function newUser(string nick) external {
		dataStore.setString(keccak256("user.nick", msg.sender), nick);
	}
	
}
