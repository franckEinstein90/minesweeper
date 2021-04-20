import moment from 'moment';
import { day } from "./definitions"

import { MinegrinderApp } from "../../../Alpha/MinegrinderApp" ; 

export const today = () : Promise<any> =>{
    const todayStr:string[] = moment().toString().split(' ');
   // return 
    
    const coords= MinegrinderApp.coordinates();  
    const apiRequest = [
        "https://api.sunrise-sunset.org/json?", 
        `lat=${coords.lat}&lng=${coords.lng}&date=2021-04-19`
    ].join('')

    return fetch(apiRequest)
    .then(response => response.json())
    .then(dayInfo => {
        return new day(todayStr.slice(0,3).join('.'), dayInfo.results); 
    })
}