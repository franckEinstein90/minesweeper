import moment from 'moment';
import {timeSlice} from "./definitions" ;


const pre = (maxGrade : number ):timeSlice[]=>{
    const returnArray = [] ; 
    let offSetUp = 50;  
    while(offSetUp > 0){
        returnArray.push({
            val:    (maxGrade+offSetUp)%60, 
            active: false
        })
        offSetUp = offSetUp - 5; 
    }
    return returnArray; 
}

const post = ( minGrade : number ):timeSlice[] =>{
    const _post = []; 
    let offSetDown = -5;
    while(offSetDown > -50) {
        _post.push({
              val: minGrade + offSetDown, 
              active : false
        })
        offSetDown = offSetDown -5
    }
   return _post;  
}


export const fiveMinuteGraduation = () : timeSlice[] =>{
        const mins      = moment().minutes(); 
        const minGrade  = mins - (mins%5); 
        const maxGrade  = minGrade + 5 ;      
        return ([
            ...(pre(maxGrade)), 

          {
            val: maxGrade, 
            active:true
          }, 

          {
            val: minGrade, 
            active : true
          }, 
          ...(post(minGrade))
        ])
}