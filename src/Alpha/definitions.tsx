export enum CellStatus {
    covered, 
    uncovered
} ; 

/***********************************************************************
 * I start with an idea. A type named 'CellType' which can be 'active'
 * or not, which contains a value, and that has a 'status'
 * ********************************************************************/
export interface TCell {
    ID          : number ; 
    _value      : any ; 
    _active     : boolean ;  //if this is an active cell
    Empty       : boolean ;
    Status      : CellStatus ; 
}

export enum Direction {
    left, 
    up, 
    down, 
    right
}

export interface Location {
    //(0,0) is top left
    i   : number ; //rows i=0 is top row
    j   : number ; //cols j=0 is first col 
}

export interface GridRow{
    cells : TCell[]; 
}

export interface Grid {
    numRows     : number   ; 
    numCols     : number   ; 
    rows        : GridRow[]; 
    activeCell  : Location ;
    getValue(l : Location )    : any;  
}