"use strict"; 

import React, {useContext} from 'react';
import ReactModal from 'react-modal'; 
import './Grid.css';
import './Cell.css';
import Dialog from './Dialog';
import CellForm from './forms/CellForm'; 
import Clock from './clock/Clock'; 
import Dot from './Dot'; 
import {GameContext} from './GameContext'; 

ReactModal.setAppElement(`#___gatsby`);
const constants = require('./core/constants').constants; 
const cells = require('./core/cells').cells; 


const START_DOT = {
    i: 11, 
    j: 15
}

const grids = require('./core/grids').grids({bombProbability:constants.BOMB_PROB})

class Grid extends React.Component {

    constructor( props ) {
     
        super(props);
        this.state = {
            cols: 20, 
            rows: 20, 
        }

        this.state.isModalOpen = false; 
        this.handleModalOpen = this.handleModalOpen.bind( this ); 
        this.handleModalClose = this.handleModalClose.bind( this ); 

        this.keySelect = this.keySelect.bind(this);
        this.resetGrid = this.resetGrid.bind( this );
        this.clickCellHandler = this.clickCellHandler.bind( this ); 
        this.uncovered = this.uncovered.bind( this );

     
        this.state.dot = START_DOT; 
        this.state.gridInfo =  grids.newGrid(this.state.rows, this.state.cols,{
            i:10
        }, this.state.dot) 

    } 

    componentDidMount(){
        this.resetGrid(); 
        document.addEventListener("keydown", this.keySelect, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.keySelect, false);
      }

    resetGrid(){ //creates a new grid and set the state to that new grid

        const newGrid = grids.newGrid(this.state.rows, this.state.cols, {
            i: 10, 
            j: 14
        }, START_DOT); 
       
        this.setState({gridInfo:newGrid}); 
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

        const gridCpy = grids.clone( this.state.gridInfo ); 
        const cell = gridCpy[i][j]; 
        cell.state = cells.states.stone;        
        this.setState({gridInfo:gridCpy}); 

    }

    clickCellHandler(i,j) {

        if( grids.adjacentToUncovered( this.state.gridInfo, i, j ) === false ) {
            return; 
        }
        const gridInfoCpy = grids.clone(this.state.gridInfo); 
        const cell =  gridInfoCpy[i][j]; 
        if(cell.bomb) {
            return this.uncoverBomb(i,j); 
        }
        cell.uncover(); 
        this.setState({gridInfo:gridInfoCpy}); 

    }

   

    cell(i,j){
        const c = this.val(i,j);
        if( c.dot ){
            return <Dot key={0}></Dot>
        }
        let buttonTag = c.bomb?c.bomb:c.neighborBombs>0?c.neighborBombs:" "
        let className = ["cell"];
        
        if( c.state === cells.states.stone ) {
            className.push( "stone" ); 
        }  

        if(c.state === cells.states.uncovered){
            className.push(c.bomb?"uncoveredBomb":"uncovered") ; 
        } else { //tile is still covered
            className.push("covered") ; 
            if( grids.adjacentToUncovered( this.state.gridInfo, i, j ) ) className.push("selectable") ; 
            buttonTag = "" ; 
      }
      return (
         <div   className={className.join(' ')} 
                onClick={e => this.clickCellHandler(i,j)}
                key={c.id}>{buttonTag}</div>
      )

    }

    row(numElements,i){ return Array(numElements).fill(null).map((x,j)=>this.cell(i,j)) }

    renderRow(i){ return ( <div className="board-row">{this.row(this.state.cols,i)}</div> )}

    renderGrid() { 
        return Array(this.state.rows).fill(null).map((_,i)=>{
            return (<div key={i}>{this.renderRow(i)}</div>); 
        })
    }

  
}
Grid.prototype.handleModalOpen = function(event) {
    // console.log('handleModalOpen: ', event);
    this.setState({ isModalOpen: true })
  }

Grid.prototype.handleModalClose = function(event){
    this.setState({ isModalOpen: false })
}

Grid.prototype.keySelect = function( event ){
    
    if(event.keyCode === 13){
        this.setState({ isModalOpen: true })
        return 
    }
    let direction = null; 
    let key = constants.KEYS.find(k => k.code === event.keyCode); 
    console.log(event.keyCode)

    if ( key === undefined ) return ; 

    if( key.symb === 'j' || key.symb === 'arrowDown' ){
        direction = grids.dotDirections.down; 
    } else if ( key.symb === 'h' || key.symb === 'arrowLeft'){
        direction = grids.dotDirections.left
    } else if ( key.symb === 'l' || key.symb === 'arrowRight' ){
        direction = grids.dotDirections.right
    } else if ( key.symb === 'k' || key.symb === 'arrowUp'){
        direction = grids.dotDirections.up
    } else {
        throw "unexpected key" 
    }

    let [newGrid, dotPosition] = grids.moveDot(this.state.gridInfo, direction); 
    this.setState({
        gridInfo:newGrid, 
        dot: dotPosition
    }); 
}

Grid.prototype.render = function(){
    return (
       <div className="container">
            <ReactModal
                isOpen={this.state.isModalOpen}
                onRequestClose={this.handleModalClose}>
                    <CellForm dot={this.state.dot}/> 
                    <button onClick={this.handleModalClose}>Close Modal</button>
            </ReactModal>


             <div className="grid"> 
                  {this.renderGrid()}
            </div>
            <div className="debug">
               i:{this.state.dot.i} 
               <br/>
               j:{this.state.dot.j}
            </div>

               <Dialog 
                  uncovered={this.uncovered()} 
                  bombs={this.bombs()}
                  uncoveredBombs={this.uncoveredBombs()}
               >
                   <Clock/>
                   <button onClick={()=>this.resetGrid()}>replay</button>
               </Dialog>
         </div>
   )}

export default Grid;

