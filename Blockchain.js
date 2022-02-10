const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block{
    constructor(timestamp = "",data=[]){
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.previous_hash = ""
    }

    getHash(){
        return SHA256(this.previous_hash+this.timestamp+JSON.stringify(this.data));
    }
}

class Blockchain {
    constructor(){
        this.chain = [new Block(Date.now().toString())];
    }

    getLastBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previous_hash = this.getLastBlock().hash;
        newBlock.hash = newBlock.getHash();
        this.chain.push(Object.freeze(newBlock))
    }

    isValid(blockchain=this){
        for (let i=1; i<blockchain.chain.length;i++){
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            
        }
    }
}

