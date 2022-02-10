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
}

class Blockchain {
    constructor(){
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blockTime = 30000;
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
            if (currentBlockNOTOK || previousHashNOTOK){
                return false;
            }

            return true;        
        }

        
    }
}

module.exports = { Block, Blockchain };
