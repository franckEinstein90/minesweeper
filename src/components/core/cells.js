"use strict";

const cells = (function(){

    return {

        states : {
            covered: 1, 
            uncovered: 2, 
            stone:3
        }, 

        bomb : 'X',

        Cell : function( pbblty ){

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
