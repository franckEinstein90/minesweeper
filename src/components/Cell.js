import React from 'react';
import './Cell.css';

class Cell extends React.Component {

   constructor(props){
      super(props); 
      this.state = {
         value: props.lit 
      }; 
   }


   render() {
    return (
      <button className="cell">
         {this.state.value}
      </button>
    );
  }
}


export default Cell;

