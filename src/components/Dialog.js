import React from 'react';
import './Dialog.css';

function Trow (props){
   return (
      <tr>
         <td>{props.tag}</td>
         <td>:</td>
         <td>{props.value}</td>
      </tr>
   )
}
function Dialog( props ) {
//          <h1>Playing time: {`${props.getTime()}`.padStart(3,'0')} seconds</h1>
    return ( 
       <div className="ui">

          {props.children}
          <div>
             <table>
                <tbody>
               <Trow tag="Uncovered Tiles" value={props.uncovered}/>
               <Trow tag="Uncovered Bombs" value={props.uncoveredBombs}/>
               <Trow tag="Total Bombs Remaining" value={props.bombs}/>
               </tbody>
             </table>
          </div>
       </div>
       )
}

export default Dialog;
