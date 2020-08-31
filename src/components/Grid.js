"use strict"; 

import React from 'react';
import './Grid.css';
import './Cell.css';
import Dialog from './Dialog'; 
const cells = require('./core/cells').cells; 

const bombProbability = 0.3;
const grids = require('./core/grids').grids({bombProbability})


class Grid extends React.Component {

  constructor( props ) {
     
      super(props);
      this.state = {
         time: 0, 
         start: Date.now(), 
         cols: 20, 
         rows: 20 
      }
      this.startTimer = this.startTimer.bind( this ); 
      this.resetGrid = this.resetGrid.bind( this );
      this.uncovered = this.uncovered.bind( this ); 
      this.state.gridInfo =  grids.newGrid(this.state.rows, this.state.cols);
      this.startTimer() ; 
   } 

   startTimer(){
      this.timer = setInterval(()=>{
            this.setState({
               time: Date.now() - this.state.start
            })
      },1000); 
   }

   resetTimer() {
      this.setState({time: 0})
   }

   val(i,j){ return this.state.gridInfo[i][j]}

   uncovered(){ //returns the number of uncovered cells in the grid
      return grids.uncoveredCells(this.state.gridInfo); 
   }
  
   uncoveredBombs(){
      return grids.uncoveredBombs(this.state.gridInfo); 
   }

   bombs(){
      return grids.bombs(this.state.gridInfo); 
   }

   uncoverBomb(i,j){

   }
   setVal(i,j) {
      if(grids.adjacentToUncovered(this.state.gridInfo, i, j)) {
      const gridInfoCpy = grids.clone(this.state.gridInfo) ; 
      const cell =  gridInfoCpy[i][j] ; 
      if(cell.bomb) this.uncoverBomb(i,j); 
      cell.uncover(); 
      this.setState({gridInfo:gridInfoCpy})
      }
   }

  resetGrid(){
      this.setState({gridInfo:grids.newGrid(this.state.rows, this.state.cols)}); 
      this.resetTimer();
  }

  cell(i,j){

      const c = this.val(i,j);
      const buttonTag = c.bomb?c.bomb:c.neighborBombs>0?c.neighborBombs:" "
      let className = ["cell"]; 
      if(c.state === cells.states.uncovered){
         className.push(c.bomb?"uncoveredBomb":"uncovered")
      } else {
         className.push("covered")
         if(grids.adjacentToUncovered(this.state.gridInfo, i, j)){
            className.push("selectable")
         }
      }
      return (
         <div className={className.join(' ')} onClick={e => this.setVal(i,j)}>{buttonTag}</div>
      )

  }

  row(numElements,i){
      return Array(numElements).fill(null).map((x,j)=>this.cell(i,j))
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
               <Dialog 
                  uncovered={this.uncovered()} 
                  bombs={this.bombs()}
                  uncoveredBombs={this.uncoveredBombs()}
               >
                  <h2>{Math.round(this.state.time/1000)}</h2>
                  <button onClick={()=>this.resetGrid()}>replay</button>
               </Dialog>
         </div>
   )}
}

export default Grid;

