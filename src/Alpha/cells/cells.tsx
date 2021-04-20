import { assert } from "node:console";
import { 
    CellStatus, TCell 
} from "../definitions" ; 

interface CellConstructionArgument {
   iD       : number ; 
   value ?  : any ; 
}

class Cell implements TCell {

    public ID            : number ; 
    public neighborBombs : number ; 

    public _value         : any ; 
    public _active  = false ; 

    public Empty    = true ; 
    public Status   = CellStatus.covered ; 


    constructor( options : CellConstructionArgument ) {
        this.ID     = options.iD ;
        //true if there is a bomb, false if not
        this.neighborBombs = 0;
        this._value = this.ID;  
    }

    get active() {
        return this._active; 
    }

    setValue(v:any){
        this._value = v
    }

}

export const cellFactory = ( () => {

    //static counter, gives unique id to each cell
    let _cellId = 1;

    return {

        //creates a new cell
        new: ( ) => {

            const newCellArguments : CellConstructionArgument = {
                iD      : _cellId
            } ; 
            _cellId += 1 ; 
            return new Cell( newCellArguments ) ; 
        }
   } ; 

})(); 

 
