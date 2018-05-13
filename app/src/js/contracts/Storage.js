const Storage = (web3, address) => { let Contract = web3.eth.contract(Storage.ABI); return Contract.at(!address ? "0xdcc7ca4f0bced24a0d6d5c8f92359910fafa8a42" : address); };
Storage.ABI = [{"constant":false,"inputs":[{"name":"newOwner","type":"address"},{"name":"key","type":"bytes32"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes32"}],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getUint","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getBytes","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getBytes32","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getBool","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_key","type":"bytes32"}],"name":"getInt","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"address"}],"name":"setAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"uint256"}],"name":"setUint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"string"}],"name":"setString","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"bytes"}],"name":"setBytes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"bytes32"}],"name":"setBytes32","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"bool"}],"name":"setBool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"},{"name":"_value","type":"int256"}],"name":"setInt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"deleteAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"deleteUint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"deleteString","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"deleteBytes","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"deleteBool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_key","type":"bytes32"}],"name":"deleteInt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
