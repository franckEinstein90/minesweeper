import React from 'react';
import { cells } from '../core/cells';
import './Cell.css';

class Cell extends React.Component {

    constructor( props ) {
        super(props);


    }

    render(){
        const i = this.props.i
        const j = this.props.j
        const buttonTag = this.props.bomb 
                            ? ' ' 
                            : this.props.neighborBombs>0
                                ? this.props.neighborBombs
                                :" "

        const className=['cell']; 
        if( this.props.cellState === cells.states.stone ){
            className.push("stone")
        }
        if( this.props.cellState === cells.states.uncovered){
            className.push(this.props.bomb?"uncoveredBomb":"uncovered") ; 
        } else { //tile is still covered 
            if( this.props.adjacentToUncovered ) className.push("selectable") ; 
            className.push("covered") ; 
        }
        return (
            <div key={this.props.id} className={className.join(' ')} onClick={e => this.props.clickCellHandler(i,j)}>
                {buttonTag}
            </div>
        )
    }
}
export default Cell;