import React from 'react';
import './Cell.css';

class Cell extends React.Component {

   constructor(props){
      super(props); 
      this.state = {
         value: null
      }; 
   }

   toggleState(){
      if(this.state.value === null){
         this.setState({value:'X'})
      } else {
         this.setState({value:null})
      }
   }

   render() {
    return (
      <button className="cell" onClick={()=>this.toggleState()}>
         {this.state.value}
      </button>
    );
  }
}


export default Cell;

