import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";

const accounts = new Map([
    [
      "A",
      {
        private:
          "6b8872a32ddfece42b68433390a530266b93b7544fd6983c07e6c9f6821c2f6f",
        public:
          "044a90233075590fe1c1eb805ddca52a7304a02f6d08e7e588b59e68f59f8676c62a032e12a1abbadb7115bc7d80a77cd82b667383737197801e0e52a5bc670036",
      },
    ],
    [
      "B",
      {
        private:
          "268c1b1f366f1d13989e0b92f82f648d1f676f2f0cf5ab251d48192db847c5da",
        public:
          "04e6ac019588d9b351943d423352e2481cab364df2b37f968a2faa238d97d28af3364f5ed5d606aaf271d698d5ecb08fc17ebf0326044efb361b4787e50acda9e5",
      },
    ],
    [
      "C",
      {
        private:
          "09a5c8ef3f9c723a7bf6df056db84d0fad6c3e0d07f314cd11fa46b79932c4ac",
        public:
          "04136a235494643841d932212550d2e35c3382a688a9440c656044c3b2e96a30e7bb764c7f13118e526632632a643a81f80b88d800912b554272ade0a128fa3fcc",
      },
    ],
  ]);

const users = Array.from(accounts.keys());

const hashMessage = (message) => keccak256(Uint8Array.from(message));
const getHexPubKey = (user) => {
    if (!user) return null;
    return toHex(getPublicKey(user)).toUpperCase();
  };

const getPublicKey = (user) => {
    if (!user) return null;
    return hexToBytes(ACCOUNT_KEYS.get(user).public);
};

const getPrivateKey = (user) => {
    if (!user) return null;
    return hexToBytes(ACCOUNT_KEYS.get(user).private);
};

const getAddress = (user) => {
    if (!user) return null;
    const pubKey = getPublicKey(user);
    const hash = keccak256(pubKey.slice(1));
    return toHex(hash.slice(-20)).toUpperCase();
  };

async function sign(username, message) {
    const privateKey = getPrivateKey(username);
    const hash = hashMessage(message);

    const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
        recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(fullSignature);
}

const wallet = {
    users,
    sign,
    getAddress,
    getHexPubKey,
}

export default wallet;

