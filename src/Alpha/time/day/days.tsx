import moment from 'moment';
import { day } from "./definitions"

import { MinegrinderApp } from "../../../Alpha/MinegrinderApp" ; 

export const today = () : Promise<any> =>{
    const momentTime : string = moment().toString();
    const currentTime :string = (momentTime.split(' '))[4]; 
    const todayStr:string[] = moment().toString().split(' ');
    const month = todayStr[1]; 
    const year = todayStr[3]; 
    const d = todayStr[2]; 
    const date : string = `${year}-05-${d}` ; 
    const coords= MinegrinderApp.coordinates();  
    const apiRequest = [
        "https://api.sunrise-sunset.org/json?", 
        `lat=${coords.lat}&lng=${coords.lng}&date=${date}`
    ].join('')

    return fetch(apiRequest)
    .then(response => response.json())
    .then(dayInfo => {
        return new day(
            todayStr.slice(0,3).join('.'), 
            dayInfo.results, 
            currentTime
        ); 
    })
}