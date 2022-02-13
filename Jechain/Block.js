const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block{
    constructor(timestamp = "",data=[]){
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.previousHash = ""
        this.nonce = 0
    }

    getHash(){
        return SHA256(this.previousHash+this.timestamp+JSON.stringify(this.data)+ this.nonce);
    }

    mine(difficulty){
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash=this.getHash();
        }
    }

    hasValidTransactions(chain,MINT_PUBLIC_ADRESS) {
        let gas,reward = 0;

        this.data.forEach(transaction => {
            if (transaction.from !== MINT_PUBLIC_ADRESS){
                gas+=transaction.gas
            } else {
                reward=transaction.amount
            }

            return (
                reward-gas === chain.reward &&
                this.data.every(transaction => transaction.isValid(transaction,chain)) &&
                this.data.every.filter(transaction => transaction.from === MINT_PUBLIC_ADRESS).length ===1
            )
        });

        return this.data.every(transaction=>transaction.isValid(transaction,chain))
    }
}

module.exports = {Block};
