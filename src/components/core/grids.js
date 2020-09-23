"use strict"; 
const cells = require('./cells').cells;

const grids = function( options ){

    const bombProbability = options.bombProbability || 0.3 ; 

    const _dotDirections = {
            left: 1, 
            up: 2, 
            down: 3, 
            right: 4
        } 

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

    let _dotLocation= null; 


    return {

        dotDirections: _dotDirections, 

        newGrid : (rows, cols, startSpace, dotLocation )=>{ 
            //returns empty 2D array of covered cells
            //that might contain a bomb
            _dotLocation = dotLocation; 

            const g = Array(rows).fill(null)
                .map((x,i)=>Array(cols).fill(i)
                .map((i,j)=>new cells.Cell(bombProbability)))
          
            //clear a 4x4 cluster
            for(let i = startSpace.i ;i<=startSpace.i + 3;i++){
                for(let j=14; j<=16;j++) {
                    let cell = g[i][j]; 
                    cell.bomb = false;
                    cell.uncover(); 
                } 
            }
            g[_dotLocation.i][_dotLocation.j].dot=true; 

            //bomb hints
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

        clone: grid => [...grid], 

        moveDot :  ( grid, direction )  => { //returns a new grid
                                             // with dot moved in
            const g = [...grid];             // in specified direction
            g[_dotLocation.i][_dotLocation.j].dot = false; 

            if( direction === _dotDirections.down ){
                _dotLocation.i += 1; 
            } else if ( direction === _dotDirections.up && _dotLocation.i > 0 ){
                _dotLocation.i -= 1; 
            } else if ( direction === _dotDirections.right){
                _dotLocation.j += 1; 
            } else if (direction === _dotDirections.left && _dotLocation.j > 0){
                _dotLocation.j -= 1; 
            }
            else {
                throw "invalid dot direction"
            }

            g[_dotLocation.i][_dotLocation.j].dot = true; 
            g[_dotLocation.i][_dotLocation.j].state = cells.states.uncovered; 
            return [g, _dotLocation]; 

        }
    }
 }

 module.exports = {
     grids
 }