"use strict";

const cells = (function(){

    let cellId = 1;

    return {

        states : {
            covered: 1, 
            uncovered: 2, 
            stone:3
        }, 

        bomb : 'X',

        Cell : function( pbblty ){

            this.id  = cellId; cellId += 1;
            this.dot = false;  
            const randomNumber = Math.random();
            this.bomb = randomNumber <= pbblty; 
            this.state = cells.states.covered;
            this.neighborBombs = 0;  

        }
   }

})(); 

cells.Cell.prototype.uncover = function(){
    this.state = cells.states.uncovered; 
}


 
module.exports = {
   cells
}
