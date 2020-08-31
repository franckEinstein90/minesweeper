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
    return ( 
       <div className="ui">
          {props.children}
          <div>
             <table>
               <Trow tag="Uncovered" value={props.uncovered}/>
               <Trow tag="Uncovered Bombs" value={props.uncoveredBombs}/>
               <Trow tag="Total Bombs" value={props.bombs}/>
             </table>
          </div>
       </div>
       )
}

export default Dialog;