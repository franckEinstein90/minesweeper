"use strict"; 

import { 
    Location, Direction, CellStatus
 } from "../../Alpha/definitions" ; 
import { cellFactory } from "../../Alpha/cells/cells" ; 
import { newGrid } from './gridHelpers/newGrid' ;

export const gridLocation = (i:number ,j:number) : Location =>{
    return {i,j}
}

export const Grid = (( )=>{

    let _bombProbability : number ; 

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

    let _dotLocation : Location ; 


    return {

        init : ( options )=> {
            _bombProbability = options.bombProbability || 0.3 ; 
        }, 

        //creates a new grid
        new: (rows: number, cols : number, activeCell : Location) => {
            return newGrid( rows, cols, activeCell ) 
        }, 

        adjacentToUncovered: (g,i,j)=> {
            return neighbors(g,i,j).some( c=>c.state === cells.states.uncovered )
        }, 

        //returns the number of uncovered cells in the grid

        clone: grid => [...grid], 

        //returns a new grid with dot moved in
        //specified direction. 
        moveDot :  ( 
                    grid, 
                    direction : Direction )  => { 

            const g = [...grid];        
            g[_dotLocation.x][_dotLocation.y].dot = false; 

            if( direction === Direction.down ){
                _dotLocation.y += 1; 
            } else if ( direction === Direction.up && _dotLocation.j > 0 ){
                _dotLocation.y -= 1; 
            } else if ( direction === Direction.right){
                _dotLocation.x += 1; 
            } else if (direction === Direction.left && _dotLocation.i > 0){
                _dotLocation.x -= 1; 
            }
            else {
                throw "invalid dot direction"
            }

            g[_dotLocation.x][_dotLocation.y].dot = true; 
            g[_dotLocation.x][_dotLocation.y].state = CellStatus.uncovered; 
            return [g, _dotLocation]; 

        }
    }
 })() ; 
