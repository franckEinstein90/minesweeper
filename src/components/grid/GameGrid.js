
import React    from 'react';
import styles   from "./GameGrid.module.css"; 
import CellRow  from "./CellRow";
import * as Calendar from '../core/grid'; 

const defaultRows = 51 ; 
const defaultCols = 51 ; 
export default class GameGrid extends React.Component {  

    constructor(props) {
        super(props);
        const activeCell = Calendar.gridLocation(0,0) ; 
        this.state = {
            rows    :   defaultRows, 
            cols    :   defaultCols, 
            activeCell,
            gridInfo : null
        }
        this.cellState = this.cellState.bind( this ); 
        //this.keySelect = this.keySelect.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keySelect, false);
        this.resetGrid(); 
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.keySelect, false);
    }

    resetGrid(){ //creates a new grid and set the state to that new grid
        const newGrid = Calendar.Grid.new(
            this.state.rows, 
            this.state.cols, 
            this.state.activeCell )  ; 
        this.setState({ gridInfo:newGrid }); 
    }

    //returns the state of the cell at (i,j)
    cellState(i,j){
        if(this.state.gridInfo){
            return this.state.gridInfo.getValue({i,j}); 
        }
        return "NaN" ;
    }

    render() {
        return (
            <div className={styles.cellGrid}> 
                { 
                  Array(this.state.rows).fill(null).map((_,i)=>{
                        return (<CellRow 
                                    cellState={this.cellState}
                                    cols={this.state.cols}
                                    activeX={this.state.activeCell.i}
                                    activeY={this.state.activeCell.j}
                                    key={i} 
                                    rowId={i} 
                                    clientWidth={this.props.clientWidth} 
                                    clientHeight={this.props.clientHeight} />)
                    })
                }
            </div>
       );
    }
}; 

/*
GameGrid.prototype.keySelect = function( event ){
    
    if(event.keyCode === 13){
        this.setState({ isModalOpen: true })
        return 
    }
    let direction = null; 
    let key = constants.KEYS.find(k => k.code === event.keyCode); 

    if ( key === undefined ) return ; 

    if( key.symb === 'j' || key.symb === 'arrowDown' ){
      direction = grids.dotDirections.down
       /* direction = grids.dotDirections.down; */
 /*   } else if ( key.symb === 'h' || key.symb === 'arrowLeft'){
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
        activeCell: dotPosition
    }); 
}*/
