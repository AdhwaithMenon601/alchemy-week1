const express = require("express");
const app = express();
const cors = require("cors");
const { utils } = require("./utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = new Map([
  ["C50BDDC42A9A15B67973E2576A60D875CAC4B516", 100], // A
  ["DDE3085A2359D230DF66BCD82C8E9C486F5FEE48", 50], // B
  ["90923DA39E639979907B838F968B3CC1D1C64117", 75], // C
]);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const pubKey = utils.getPublicKeyFromSignature(message, signature);
  const sender = utils.getAddressFromPublicKey(pubKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances.get(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(sender, balances.get(sender) - amount);
    balances.set(recipient, balances.get(recipient) + amount);
    res.send({ balance: balances.get(sender) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
