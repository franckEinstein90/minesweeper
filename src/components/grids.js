"use strict"; 
const cells = require('./cells').cells;

const grids = function( options ){

    const bombProbability = options.bombProbability || 0.3 ; 

    const countNeighborBombs = (grid,i,j)=> {   //counts the number of bombs in the neighborood
        const countBombs = arr => arr.reduce((a,b)=>a+=b.bomb?1:0,0)
        const prev = i>0 ? grid[i-1].slice(j>0?j-1:j,j+2):[]; 
        const mid = grid[i].slice(j>0?j-1:j,j+2); 
        const next = i < grid.length-1 ? grid[i+1].slice(j>0?j-1:j,j+2):[]
        return [prev, mid, next].reduce((a,b)=>a+countBombs(b),0)
    }
 

    return {

        newGrid : (rows,cols)=>{ 
            //returns empty 2D array of covered cells
            //that might contain a bomb
            const g = Array(rows).fill(null)
                .map((x,i)=>Array(cols).fill(i)
                .map((i,j)=>new cells.Cell(bombProbability)))
          
            //clear a 4x4 cluster
            for(let i=8; i<=10;i++){
                for(let j=14; j<=16;j++) {
                    let cell = g[i][j]; 
                    cell.bomb = false;
                    cell.uncover(); 
                } 
            }

            g.forEach((r,i)=>r.forEach((c,j)=>c.neighborBombs=countNeighborBombs(g,i,j))); 
            return g; 
        },
        
        uncoveredCells : g =>{ //returns the number of uncovered cells in the grid
            return g.reduce((a,row)=>{
                return a + row.reduce((b,c)=>{
                   return b + (c.state === cells.states.uncovered?1:0);  
                },0)
             },0)   
        },

        clone: grid => [...grid]
    }
 }

 module.exports = {
     grids
 }