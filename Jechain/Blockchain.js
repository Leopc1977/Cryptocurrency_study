const { Block} = require("./Block.js");
const { Transaction} = require("./Transaction.js");

const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
const EC = require("elliptic").ec, ec = new EC("secp256k1");
const MINT_KEY_PAIR = ec.genKeyPair();
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic("hex");

const holderKeyPair = ec.genKeyPair();

class Blockchain {
    constructor(){
        this.transactions = [];
        this.difficulty = 1;
        this.blockTime = 30000;
        this.reward = 42;
        
        //Genesis block
        const initialCoinRelease = new Transaction(MINT_PUBLIC_ADDRESS, holderKeyPair.getPublic("hex"),10000,10);
        this.chain = [new Block(Date.now().toString(), [initialCoinRelease])];
    }

    addTransaction(transaction) {
        if (transaction.isValid(transaction,this,MINT_PUBLIC_ADDRESS)) {
            this.transactions.push(transaction); 
        }
    }

    mineTransactions(rewardAddress) {
        let gas = 0
        //get all gas
        this.transactions.forEach(transaction => {
            gas+=transaction.gas
        });

        const rewardTransaction = new Transaction(MINT_PUBLIC_ADDRESS, rewardAddress, this.reward);
        rewardTransaction.sign(MINT_KEY_PAIR)
        
        this.addBlock(new Block(Date.now().toString(), [rewardTransaction,...this.transactions]));
        
         // Prevent people from minting coins and mine the minting transaction.
         if (this.transactions.length !== 0) {
            this.addBlock(new Block(Date.now().toString(), [rewardTransaction, ...this.transactions]));
         }
        
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
            transactionNOTOK = (!currentBlock.hasValidTransactions(blockchain,MINT_PUBLIC_ADRESS))
            if (currentBlockNOTOK || previousHashNOTOK || transactionNOTOK){
                return false;
            }
        }
        return true;        
    }

    getBalanceOfAddress(address){
        let balance = 0;

        this.chain.forEach(block =>{
            block.data.forEach(transaction => {
                console.log(transaction)
                if (transaction.from === address) {
                    balance -= transaction.amount;
                    balance -= transaction.gas;
                }
                if (transaction.to === address) {
                    balance += transaction.amount;
                }
            });
        });
        return balance;
    }
}

module.exports = {Blockchain,holderKeyPair};
