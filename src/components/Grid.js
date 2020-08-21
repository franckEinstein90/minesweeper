import React from 'react';
import Cell from './Cell'; 
import './Grid.css';



const gridInfo = (rows,cols)=>Array(rows).fill(null).map((x,i)=>Array(cols).fill(i).map((i,j)=>""))

class Grid extends React.Component {

  constructor(props) {
     
      super(props);
      this.state = {
         cols:30,
         rows:20
      }
      this.state.gridInfo =  gridInfo(this.state.rows, this.state.cols)
   } 

  val(i,j){ return this.state.gridInfo[i][j] }
   
  setVal(i,j) {
      let gridInfo = [...this.state.gridInfo]
      gridInfo[i][j] = gridInfo[i][j]==='X'?"":'X' 
      this.setState({gridInfo})
  } 
   resetGrid(){
      this.setState({gridInfo:gridInfo(this.state.rows, this.state.cols)})
   }

   row(numElements,i){
      return Array(numElements).fill(null)
      .map((x,j)=><button className="cell" onClick={()=>this.setVal(i,j)}>{this.val(i,j)}</button>)
   }

   renderRow(i){
      return (<div className="board-row">{this.row(this.state.cols,i)}</div>)
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

