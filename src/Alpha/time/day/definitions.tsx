import {TimeSpan, TimeUnit} from "../definitions"  ; 

interface Day extends TimeSpan {
    toString():string ; //string representation
    timeLeft: number ; //how much time is left in the day (s)
    timeSpent: number ; //how much time of the day is already gone (s)
}

export class day implements Day {

    public length = 1; 
    public unit = TimeUnit.day ; 
    private stringRep; 
    private description; 

    public timeLeft : number ; 
    public timeSpent : number ;
    

    constructor(stringRep : string, description:Object, currentTime : string ){
        const totalTimeSeconds = 24*60*60; 
        const c = currentTime.split(':').map(x => +x);
        c[0] = c[0] * 60 * 60; //hours into secs
        c[1] = c[1] * 60 ; //mins into secs  
        this.timeSpent = +(((c[0] + c[1] + c[2])/totalTimeSeconds).toFixed(2)) ; 
        this.timeLeft = 1 - this.timeSpent ;  
        this.stringRep = stringRep; 
        this.description = description; 

    }

    get toString(){
        return this.stringRep; 
    }

}