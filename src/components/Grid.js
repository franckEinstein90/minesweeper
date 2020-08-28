"use strict"; 

import React from 'react';
import './Grid.css';
import './Cell.css'; 
const cells = require('./cells').cells; 

const bombProbability = 0.3;
const grids = require('./grids').grids({bombProbability})
const defaultCols = 20; 
const defaultRows = 20; 



class Grid extends React.Component {

  constructor(props) {
     
      super(props);
      this.state = {
         cols:defaultCols,
         rows:defaultRows
      }
      this.state.gridInfo =  grids.newGrid(this.state.rows, this.state.cols)
   } 

   val(i,j){ return this.state.gridInfo[i][j]}

   uncovered(){ //returns the number of uncovered cells in the grid
      return grids.uncoveredCells(this.state.gridInfo); 
   } 

   setVal(i,j) {
      const gridInfoCpy = grids.clone(this.state.gridInfo) ; 
      const cell =  gridInfoCpy[i][j] ; 
      if(cell.bomb) return this.resetGrid()
      cell.uncover(); 
      this.setState({gridInfo:gridInfoCpy})
   }

  resetGrid(){
      this.setState({gridInfo:grids.newGrid(this.state.rows, this.state.cols)})
  }

  row(numElements,i){
      return Array(numElements).fill(null)
      .map((x,j)=>{
         const cell = this.val(i,j);
         const buttonTag = cell.bomb?cells.bomb:cell.neighborBombs>0?cell.neighborBombs:" "
         const className = cell.state === cells.states.covered?"covered":"uncovered"; 
         return (
         <button className={className} onClick={()=>this.setVal(i,j)}>{buttonTag}</button>
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
            <div className="grid">
                {this.renderGrid()}
            </div>
            <div className="ui">
               <button onClick={()=>this.resetGrid()}>replay</button>
               <div>
                  <h1>Uncovered:{this.uncovered()}</h1>
               </div>
            </div>
            </div>
      )
   }
}

export default Grid;

