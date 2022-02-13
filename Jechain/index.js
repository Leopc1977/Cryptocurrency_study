const { Blockchain,holderKeyPair } = require("./Blockchain.js");
const { Block} = require("./Block.js");
const { Transaction } = require("./Transaction.js");
const EC = require("elliptic").ec, ec = new EC("secp256k1");

const WS = require("ws")

p = console.log

const JeChain = new Blockchain();
JeChain.difficulty=2;

const girlfriendWallet = ec.genKeyPair();

const transaction = new Transaction(holderKeyPair.getPublic("hex"),girlfriendWallet.getPublic("hex"),100,10);
transaction.sign(holderKeyPair);
JeChain.addTransaction(transaction);

JeChain.mineTransactions(holderKeyPair.getPublic("hex"))

console.log("Your balance:", JeChain.getBalanceOfAddress(holderKeyPair.getPublic("hex")));
console.log("Your girlfriend's balance:", JeChain.getBalanceOfAddress(girlfriendWallet.getPublic("hex")));

const server = new WS.Server({ port: "SOME PORT" });

server.on("connection", async (socket, req) => {
    // This event handler will be triggered every time somebody send us connections
});

socket.on("open", () => {
    // This event handler will be triggered when a connection is opened
})
// Close a connection
socket.on("close", () => {
    // This event handler will be triggered when the connection is closed
})
// Listens for messages
socket.on("message", message => {
    // "message" is message, yes
})