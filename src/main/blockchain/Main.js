import { Blockchain, Transaction } from "./Blockchain.js";
import pkg from "elliptic";
const ecal = new pkg.ec("secp256k1");

const myKey = ecal.keyFromPrivate(
  "e920447137f902cb42c047609dec2e6e7ccfc74a61eacf3e7e83bf707ecd22ae"
);

const myWalletAddress = myKey.getPublic("hex");

let coin = new Blockchain();

const ts1 = new Transaction(myWalletAddress, "someone_public_address", 10);
ts1.signTransaction(myKey);

coin.addTransaction(ts1);

console.log("Starting the miner...");
coin.minePendingTransactions(myWalletAddress);

console.log(
  "Miner's balance of address is " + coin.getBalanceOfAddress(myWalletAddress)
);

coin.chain[1].transactions[0].amout = 1;

console.log("Is chain valid ?", coin.isChainValid());

// console.log("Mining block 1");
// coin.addBlock(new Block(1, "10/10/2017", { amount: 4 }));

// console.log("Mining block 2");
// coin.addBlock(new Block(2, "12/10/2017", { amount: 10 }));

// console.log("Is blockchain, valid ? ", coin.isChainValid());
// // console.log(JSON.stringify(coin, null, 4));

// coin.chain[1].data = "hacked";
// console.log("Is blockchain, valid ? ", coin.isChainValid());
