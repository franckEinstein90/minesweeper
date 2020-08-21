import React from 'react';
import Cell from './Cell'; 
import './Grid.css';
 
class Grid extends React.Component {

  constructor(props) {
     
      super(props);
      this.state = {
         cols:30,
         rows:20
      }

      this.state.gridInfo = Array(this.state.rows).fill(null)
      .map((x,i)=>Array(this.state.cols).fill(i).map((i,j)=>""))
  }

  val(i,j){ return this.state.gridInfo[i][j] }

  setVal(i,j) {
      let gridInfo = [...this.state.gridInfo]
      gridInfo[i][j] = gridInfo[i][j]==='X'?"":'X' 
      this.setState({gridInfo})
  } 

  row(numElements,i){
      return Array(numElements).fill(null)
      .map((x,j)=><button className="cell" onClick={()=>this.setVal(i,j)}>{this.val(i,j)}</button>)
   }

   renderRow(i){return (<div className="board-row">{this.row(this.state.cols,i)}</div>)}

   render() { return Array(this.state.rows).fill(null).map((_,i)=>{
         return (<div>{this.renderRow(i)}</div>); 
      })
   }
}






export default Grid;

