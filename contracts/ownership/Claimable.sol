pragma solidity ^0.4.23;

import "./Ownable.sol";

/**
 * @title Claimable
 * @dev Extension for the Ownable contract, where the ownership needs to be claimed.
 * This allows the new owner to accept the transfer.
 */
contract Claimable is Ownable {
	address public pendingOwner;
	bytes32 private pendingOwnerVerifKey;

	/**
	 * @dev Modifier throws if called by any account other than the pendingOwner.
	 */
	modifier onlyPendingOwner() {
		require(msg.sender == pendingOwner);
		_;
	}

	/**
	 * @dev Allows the current owner to set the pendingOwner address.
	 * @param newOwner The address to transfer ownership to.
	 */
	function transferOwnership(address newOwner, bytes32 key) onlyOwner public {
		pendingOwner = newOwner;
		pendingOwnerVerifKey = key;
	}


	/**
	 * @dev Allows the pendingOwner address to finalize the transfer.
	 */
	function claimOwnership(bytes32 key) onlyPendingOwner public {
		require(pendingOwnerVerifKey == key);

		emit OwnershipTransferred(owner, pendingOwner);
		owner = pendingOwner;
		pendingOwner = address(0);
	}
}