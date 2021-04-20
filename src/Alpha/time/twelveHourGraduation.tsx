import {TimeUnit, TimeSpan} from "./definitions" ; 
import {timeSlice} from "./definitions" ;
import moment from 'moment';

export const twelveHourGraduation = ()=> {
    const hours = moment().hours(); 
    console.log(hours)
    return [{
        val: hours, 
        active: false
    }]

}