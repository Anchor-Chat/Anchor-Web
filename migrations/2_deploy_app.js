const Storage = artifacts.require("Storage");
const Anchor = artifacts.require("Anchor");

const fs = require("fs");

const Web3 = require("web3");
let web3 = new Web3();

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
			Anchor, Storage.address
		);
	}).then(() => {
		// Register contracts with the hub (the Storage contract)
		registerContract(Anchor);

		// Create contract import scripts for the frontend app
		//createImportScript(Storage);
		//createImportScript(Decentracord);
	});
};

function registerContract(contract) {
	contract.registered = true;
	storage.setAddress(web3.sha3("contract.name"+contract.contractName), contract.address);
	storage.setAddress(web3.sha3("contract.address"+contract.address), contract.address);
}

/**
 * Function that "seals" the storage contract
 * When sealed the contract can only be changed by registered contracts
 * If not sealed then can be changed by the owner AND by the registered contracts
 */
function sealStorage() {
	storage.setBool(web3.sha3("contract.storage.initialised"), true);
}

function createImportScript(contract) {
	let js    = "const "+ contract.contractName +" = (web3, address) => { let Contract = web3.eth.contract("+ contract.contractName +".ABI); return Contract.at(!address ? \""+contract.address+"\" : address); };\r\n";
	js       += contract.contractName+".ABI = "+JSON.stringify(contract.abi)+";\n";
	if (contract.registered) js += contract.contractName+".Hash = \""+web3.sha3("contract.name"+contract.contractName)+"\";";

	fs.writeFileSync("./app/src/js/contracts/"+contract.contractName+".js", js);
}