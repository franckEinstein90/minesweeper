
export enum TimeUnit {
    second, 
    minute,
    hour, 
    day
}

export interface TimeSpan {
    length  : number ; 
    unit    : TimeUnit ; 
}

export interface timeSlice{
    val: number ; 
    active:boolean; 
}