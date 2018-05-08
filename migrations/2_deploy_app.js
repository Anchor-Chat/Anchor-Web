//const Web3 = require("web3");

const Storage = artifacts.require("Storage");
const Decentracord = artifacts.require("Decentracord");

const fs = require("fs");

const Web3 = require("web3");

let storage;

module.exports = (deployer, network) => {
	// Deploy storage
	deployer.deploy(Storage, { overwrite: network == "dev" ? true : false }).then(() => {
		// Log the storage address
		console.log("The storage contract's address is:");
		console.log(Storage.address);

		// Get the deployed storage instance
		Storage.deployed().then((inst) => {
			storage = inst;
		});

		// Deploy other contracts
		return deployer.deploy(
			Decentracord, Storage.address
		);
	}).then(() => {
		// Register contracts with the hub (the Storage contract)
		registerContract(Decentracord, "Main");

		// Create contract import scripts for the frontend app
		//createImportScript(Storage);
		//createImportScript(Decentracord);
	});
};

function registerContract(contract, name) {
	storage.setAddress("contract.name"+name, contract.address);
	storage.setAddress("contract.address"+contract.address, contract.address);
}

/**
 * Function that "seals" the storage contract
 * When sealed the contract can only be changed by registered contracts
 * If not sealed then can be changed by the owner AND by the registered contracts
 */
function sealStorage() {
	storage.setBool("contract.storage.initialised", true);
}

function createImportScript(contract) {
	let js = "let ABI = "+JSON.stringify(contract.abi)+";\r\n";
	js    += "module.exports = (web3, address) => { let Contract = web3.eth.contract(ABI); return Contract.at(!address ? "+contract.address+" : address); };";

	fs.writeFileSync("./app/contracts/"+contract.contractName+".js", js);
}