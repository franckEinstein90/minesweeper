"use strict";

const cells = (function(){
   return {
      states : {
         covered: 1, 
         uncovered: 2
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

module.exports = {
   cells
}
