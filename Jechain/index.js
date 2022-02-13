const { Blockchain,holderKeyPair } = require("./Blockchain.js");
const { Block} = require("./Block.js");
const { Transaction } = require("./Transaction.js");
const EC = require("elliptic").ec, ec = new EC("secp256k1");

p = console.log

const JeChain = new Blockchain();
JeChain.difficulty=2;

const girlfriendWallet = ec.genKeyPair();

const transaction = new Transaction(holderKeyPair.getPublic("hex"),girlfriendWallet.getPublic("hex"),100,10);
//transaction.sign(holderKeyPair);
//JeChain.addTransaction(transaction);
//JeChain.mineTransactions(holderKeyPair.getPublic("hex"))

console.log("Your balance:", JeChain.getBalanceOfAddress(holderKeyPair.getPublic("hex")));
console.log("Your girlfriend's balance:", JeChain.getBalanceOfAddress(girlfriendWallet.getPublic("hex")));