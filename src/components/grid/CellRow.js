import React from 'react';
import styles from "./CellRow.module.css"; 
import Cell from "./Cell"; 



export default class CellRow extends React.Component{
    constructor( props ){
        super(props)
    }

    render(){
        return(
            <div className={styles.cellRow}>
                { 
                    Array(this.props.cols).fill(null).map((_,i)=>{
                        return (<Cell   key={i} 
                                        row={this.props.rowId}
                                        col={i}
                                        //coordinates of active cell
                                        activeX={this.props.activeX}
                                        activeY={this.props.activeY}
                                        cellState={this.props.cellState}/>) 
                    })
                }
            </div>
        )
    }
}