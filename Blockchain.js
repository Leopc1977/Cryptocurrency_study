const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
const EC = require("elliptic").ec, ec = new EC("secp256k1");
const keyPair = ec.genKeyPair();

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    sign(keyPair) {
        // Check if the public key matches the "from" address of the transaction
        if (keyPair.getPublic("hex") === this.from) {
            // Sign the transaction
            this.signature = keyPair.sign(SHA256(this.from + this.to + this.amount), "base64").toDER("hex");
        }
    }

    isValid(tx,chain){
        return(
            tx.from &&
            tx.to &&
            tx.amount &&
            chain.getBalanceOfAddress(tx.from) >= tx.amount &&
            ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from+tx.to+tx.amount+tx.gas),tx.signature)
        )
    }
}

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

    hasValidTransactions(chain) {
        return this.data.every(transaction=>transaction.isValid(transaction,chain))
    }
}

class Blockchain {
    constructor(){
        this.transactions = [];
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blockTime = 30000;
        this.reward = 42;
    }

    addTransaction(transaction) {
        if (transaction.isValid(transaction,this)) {
            this.transactions.push(transaction); 
        }
    }

    mineTransactions(rewardAddress) {
        this.addBlock(new Block(Date.now().toString(), [new Transaction(CREATE_REWARD_ADDRESS, rewardAddress, this.reward), this.transactions]));
        this.transactions = [];
    }

    getLastBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.getHash();
        newBlock.mine(this.difficulty)
        this.chain.push(Object.freeze(newBlock))

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;

    }

    isValid(blockchain=this){
        for (let i=1; i<blockchain.chain.length;i++){
            const currentBlock = blockchain.chain[i];
            const previousBlock = blockchain.chain[i-1];

            //check validation
            currentBlockNOTOK = (currentBlock.hash !== previous_hash.getHash())
            previousHashNOTOK = (previousBlock.hash !==currentBlock.previousHash)
            transactionNOTOK = (!currentBlock.hasValidTransactions(blockchain))
            if (currentBlockNOTOK || previousHashNOTOK || transactionNOTOK){
                return false;
            }
        }
        return true;        
    }

    getBalanceOfAddress(address){
        let balance = 0;

        this.chain.forEach(transaction=>{
            if (transaction.from === address) {
                balance -= transaction.amount;
            }
            if (transaction.to === address) {
                balance += transaction.amount;
            }
        });
        return balance;
    }
}

module.exports = { Block, Blockchain,Transaction };
