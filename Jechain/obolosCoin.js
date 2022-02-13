const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
const { Block, Transaction, JeChain } = require("./jechain");
const EC = require("elliptic").ec, ec = new EC("secp256k1");

const { Blockchain,holderKeyPair } = require("./Blockchain.js");
const { Block} = require("./Block.js");
const { Transaction } = require("./Transaction.js");