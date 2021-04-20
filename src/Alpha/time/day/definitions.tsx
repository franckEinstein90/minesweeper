import {TimeSpan, TimeUnit} from "../definitions"  ; 

interface Day extends TimeSpan {
    toString():string ; //string representation
}

export class day implements Day {
    public length = 1; 
    public unit = TimeUnit.day ; 
    private stringRep; 
    private description; 
    constructor(stringRep : string, description:Object ){
        debugger; 
        this.stringRep = stringRep; 
        this.description = description; 
    }
    get toString(){
        return this.stringRep; 
    }

}