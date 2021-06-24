import React from 'react';
import styles from './Cell.module.css';

class Cell extends React.Component {

    constructor( props ) {
        super(props);
    }

    render(){
      const classes = [styles.cell] ; 

      //active class?
      if(this.props.col === this.props.activeX && this.props.row === this.props.activeY){
        classes.push(styles.active); 
      }

      return (
          <div className={classes.join(' ')}>
              <div> { this.props.cellState(this.props.col, this.props.row) } </div>
              <div> {`${this.props.row} - ${this.props.col}`} </div>
          </div>
        )
    }
}
export default Cell;