const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index,timestamp,data,previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash= this.calculatehash();
        this.nonce = 0;
    }
    
    calculatehash(){
        var stringOfBlock = this.index+this.previousHash+this.timestamp+JSON.stringify(this.data + this.nonce).toString();
        return SHA256(stringOfBlock).toString();
    }

    mineBlock(difficulty){
        // console.log('Difficulty = ' + difficulty + ' : ' + Array(difficulty+1).join('0'));
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join('0')){
            this.nonce++;
            this.hash = this.calculatehash();
        }

        console.log('Block mined: Block ' + this.index + ' hash : ' + this.hash);

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0,'20.01.2018','Genesis Block','0');
    }

    getLastBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculatehash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
};





let uCoin = new Blockchain();
console.log('Mining block 1.....');
uCoin.addBlock(new Block(1, '21.01.2018', { amount: 1 } ));
console.log('Mining block 2.....');
uCoin.addBlock(new Block(2, '21.01.2018', { amount: 2 } ));



// console.log(JSON.stringify(uCoin,null,4));
// console.log(uCoin.isChainValid());

// uCoin.chain[1].data.amount = 100000;
// console.log(JSON.stringify(uCoin,null,4));
// console.log(uCoin.isChainValid());



// console.log(Array(4+1).join('0'));