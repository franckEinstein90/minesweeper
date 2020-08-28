"use strict"; 

import React from 'react';
import './Grid.css';
import './Cell.css'; 
const cells = require('./cells').cells; 


const bombProbability = 0.3;
const defaultCols = 20; 
const defaultRows = 20; 

const gridInfo = (rows,cols)=>{ //creates an empty array of covered cells
   const newGrid = Array(rows).fill(null)
   .map((x,i)=>Array(cols).fill(i)
   .map((i,j)=>new cells.Cell(bombProbability)))
   const countNeighborBombs = (i,j)=> {   //counts the number of bombs in the neighborood
      const countBombs = arr => arr.reduce((a,b)=>a+=b.bomb?1:0,0)
      const prev = i>0 ? newGrid[i-1].slice(j>0?j-1:j,j+2):[]; 
      const mid = newGrid[i].slice(j>0?j-1:j,j+2); 
      const next = i < newGrid.length-1 ?newGrid[i+1].slice(j>0?j-1:j,j+2):[]
      return [prev, mid, next].reduce((a,b)=>a+countBombs(b),0)
   }
   //clear a 4x4 cluster
   for(let i=8; i<=10;i++){
      for(let j=14; j<=16;j++){
         newGrid[i][j].bomb = false; 
         newGrid[i][j].state = cells.states.uncovered; 
      }
   }
   newGrid.forEach((row,i)=>{
      row.forEach((cell,j)=>{
         if(!cell.bomb) cell.neighborBombs = countNeighborBombs(i,j) ;
      })
   })
   return newGrid; 
}


class Grid extends React.Component {

  constructor(props) {
     
      super(props);
      this.state = {
         cols:defaultCols,
         rows:defaultRows
      }
      this.state.gridInfo =  gridInfo(this.state.rows, this.state.cols)
   } 

  val(i,j){ return this.state.gridInfo[i][j]}

  uncovered(){ //returns the number of uncovered cells in the grid
      return this.state.gridInfo.reduce((a,row)=>{
         return a + row.reduce((b,c)=>{
            return b + (c.state === cells.states.uncovered?1:0);  
         },0)
      },0)   
  } 
  setVal(i,j) {
      const gridInfoCpy = [...this.state.gridInfo];
      const cell =  gridInfoCpy[i][j]
      if(cell.bomb) return this.resetGrid()
      cell.state = cells.states.uncovered; 
      this.setState({gridInfoCpy})
  } 
  resetGrid(){
      this.setState({gridInfo:gridInfo(this.state.rows, this.state.cols)})
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

