import SHA256 from "crypto-js/sha256.js";

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2024", "Genesis block", "0");
  }

  getLastestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLastestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let coin = new Blockchain();
coin.addBlock(new Block(1, "10/10/2017", { amount: 4 }));
coin.addBlock(new Block(2, "12/10/2017", { amount: 10 }));

console.log("Is blockchain, valid ? ", coin.isChainValid());
// console.log(JSON.stringify(coin, null, 4));

coin.chain[1].data = "hacked";
console.log("Is blockchain, valid ? ", coin.isChainValid());
