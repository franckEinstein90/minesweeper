
import { 
    Location, Direction, 
    TCell, GridRow, Grid, 
    CellStatus
 } from "../../../Alpha/definitions" ; 

import { cellFactory }   from '../../../Alpha/cells/cells' ;

const _gridRow = (numCols : number):GridRow => {

    const row = Array( numCols ).fill(null);
    return {
        cells : row.map( _ => cellFactory.new( ) ) 
    }
}

//creates a new grid
export const newGrid = (
    numRows     : number, 
    numCols     : number,
    activeCell  : Location  ) : Grid => { 

    //returns empty 2D array of covered cells
    return {
        numRows, 
        numCols, 
        activeCell,
        rows: Array(numRows).fill(null).map( _ => _gridRow(numCols)), 
        getValue : ( l : Location )=>'fsa' 
    }

}