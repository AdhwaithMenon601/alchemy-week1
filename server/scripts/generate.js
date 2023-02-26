const secp = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1));


console.log("private key : ", toHex(privateKey));
console.log("public key  : ", toHex(publicKey));
console.log("address : ", toHex(address.slice(-20)).toUpperCase());


// Sample wallets for use
/*
A
private key :  6b8872a32ddfece42b68433390a530266b93b7544fd6983c07e6c9f6821c2f6f
public key  :  044a90233075590fe1c1eb805ddca52a7304a02f6d08e7e588b59e68f59f8676c62a032e12a1abbadb7115bc7d80a77cd82b667383737197801e0e52a5bc670036
address :  C50BDDC42A9A15B67973E2576A60D875CAC4B516


B
private key :  268c1b1f366f1d13989e0b92f82f648d1f676f2f0cf5ab251d48192db847c5da
public key  :  04e6ac019588d9b351943d423352e2481cab364df2b37f968a2faa238d97d28af3364f5ed5d606aaf271d698d5ecb08fc17ebf0326044efb361b4787e50acda9e5
address :  DDE3085A2359D230DF66BCD82C8E9C486F5FEE48

C
private key :  09a5c8ef3f9c723a7bf6df056db84d0fad6c3e0d07f314cd11fa46b79932c4ac
public key  :  04136a235494643841d932212550d2e35c3382a688a9440c656044c3b2e96a30e7bb764c7f13118e526632632a643a81f80b88d800912b554272ade0a128fa3fcc
address :  90923DA39E639979907B838F968B3CC1D1C64117
*/