const { Block, Blockchain } = require("./Blockchain.js");
const JeChain = new Blockchain();
JeChain.difficulty=5
JeChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }));
console.log(JeChain.chain); 