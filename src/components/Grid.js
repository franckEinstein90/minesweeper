import React from 'react';
import Cell from './Cell'; 
import './Grid.css';
 
class Grid extends React.Component {
   renderRow(numCells){
      return Array(numCells).fill(<Cell />);
   }

   render() {
    return (
      <div>
        <div className="board-row">
          {this.renderRow(10)}
        </div>
        <div className="board-row">
          {this.renderRow(10)}
        </div>
        <div className="board-row">
          {this.renderRow(10)}
        </div>
      </div>
    );
  }
}

export default Grid;

