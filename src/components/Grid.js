"use strict"; 

import React from 'react';
import './Grid.css';
import './Cell.css'; 


const cells = (function(){
   return {
      states : {
         covered: 1, 
         uncovered: 2
      }, 

      Cell : function( pbblty ){
         const randomNumber = Math.random();
         this.bomb = randomNumber <= pbblty?'X':'' 
         this.state = cells.states.covered; 
      }
   }
})(); 

const bombProbability = 0.3; 
const gridInfo = (rows,cols)=>{ //creates an empty array of covered cells
   const newGrid = Array(rows).fill(null)
   .map((x,i)=>Array(cols).fill(i)
   .map((i,j)=>new cells.Cell(bombProbability)))

   return newGrid; 
}
class Grid extends React.Component {

  constructor(props) {
     
      super(props);
      this.state = {
         cols:30,
         rows:20
      }
      this.state.gridInfo =  gridInfo(this.state.rows, this.state.cols)
   } 

  val(i,j){ return this.state.gridInfo[i][j]}
   
  setVal(i,j) {
      const gridInfo = [...this.state.gridInfo]; 
      gridInfo[i][j].state = cells.states.uncovered; 
      this.setState({gridInfo})
  } 
   resetGrid(){
      this.setState({gridInfo:gridInfo(this.state.rows, this.state.cols)})
   }

   row(numElements,i){
      return Array(numElements).fill(null)
      .map((x,j)=>{
         const className = this.val(i,j).state ===cells.states.covered?"covered":"uncovered"; 
         return (
         <button className={className} onClick={()=>this.setVal(i,j)}>{this.val(i,j).bomb}</button>
         )
      })
   }

   renderRow(i){
      return ( <div className="board-row">{this.row(this.state.cols,i)}</div>)
   }

   renderGrid() { 
      return Array(this.state.rows).fill(null).map((_,i)=>{
         return (<div>{this.renderRow(i)}</div>); 
      })
   }

   render(){
      return (
            <div className="container">
            <div>
                {this.renderGrid()}
            </div>
            <div>
               <button onClick={()=>this.resetGrid()}>replay</button>
            </div>
            </div>
      )
   }
}

export default Grid;

