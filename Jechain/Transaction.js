const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
const EC = require("elliptic").ec, ec = new EC("secp256k1");

class Transaction {
    constructor(from, to, amount,gas = 0) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.gas = gas
        
        console.log("NEW TRANSACTION: "+ this.amount)
    }

    sign(keyPair) {
        // Check if the public key matches the "from" address of the transaction
        if (keyPair.getPublic("hex") === this.from) {
            // Sign the transaction
            this.signature = keyPair.sign(SHA256(this.from + this.to + this.amount + this.gas), "base64").toDER("hex");
        }
    }

    isValid(tx,chain,MINT_PUBLIC_ADDRESS){
        return(
            tx.from &&
            tx.to &&
            tx.amount &&
            (chain.getBalanceOfAddress(tx.from) >= tx.amount+tx.gas || tx.from === MINT_PUBLIC_ADDRESS) &&
            ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from+tx.to+tx.amount+tx.gas),tx.signature)
        )
    }
}

module.exports = {Transaction};