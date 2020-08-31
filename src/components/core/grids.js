"use strict"; 
const cells = require('./cells').cells;


const grids = function( options ){

    const bombProbability = options.bombProbability || 0.3 ; 

    const neighbors = (grid, i, j) => {
        const prev = i>0 ? grid[i-1].slice(j>0?j-1:j,j+2):[]; 
        const mid = grid[i].slice(j>0?j-1:j,j+2); 
        const next = i < grid.length-1 ? grid[i+1].slice(j>0?j-1:j,j+2):[]
        return prev.concat(mid).concat(next); 
    }

    const countNeighborBombs = (grid,i,j)=> neighbors(grid,i,j).reduce((a,b)=>a+=b.bomb?1:0,0) 
    
    const count  = (g, predicate)=> {
        return g.reduce((a,row)=>{
            return a + row.reduce((b,c)=> b + (predicate(c)?1:0),0)
         },0)   
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
        adjacentToUncovered: (g,i,j)=> {
            return neighbors(g,i,j).some( c=>c.state === cells.states.uncovered )
        }, 
        //returns the number of uncovered cells in the grid
        uncoveredCells : g => count(g, c => c.state === cells.states.uncovered ) ,

        uncoveredBombs : g => count(g, c=>{
            return (c.state === cells.states.uncovered && c.bomb); 
        }), 

        bombs: g => count(g, c=>c.bomb) , 

        clone: grid => [...grid]
    }
 }

 module.exports = {
     grids
 }