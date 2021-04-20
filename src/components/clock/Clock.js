import React from 'react';
import moment from 'moment';
import styles from "./Clock.module.css" ; 
import { fiveMinuteGraduation } from "../../Alpha/time/fiveMinuteGraduation" ; 
import { twelveHourGraduation } from "../../Alpha/time/twelveHourGraduation" ; 
import { MinegrinderApp } from "../../Alpha/MinegrinderApp" ; 


const format = ( num ) => {
  const strRep = num.toString() ; //Math.abs((num%60)).toString(); 
  return strRep.length < 2
      ? '0' + strRep
      : strRep; 
}

class Clock extends React.Component {  

    constructor( props ) {
        super(props);
        const date = moment().format(); 
        this.state = {date};
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const date = moment().format(); 
        this.setState({
          date
        });
        this.props.tick( date ); 
      }

    renderFiveMinsGraduation(){
      return fiveMinuteGraduation().map(s =>{
        return (<div>{format(s.val)}</div>) ; 
      })
    }

    render() {

      return (
        <div className={styles.clockContainer}>
          <div>
            {this.state.date.split('T')[1].split('-')[0]}
          </div>

          <div className={styles.visualClockContainer}>
            {/*this.renderFiveMinsGraduation()*/}
            {twelveHourGraduation().map(s => {
              return (<div>{s.val}</div>)
            })}
          </div>

        </div>
      );
    }
}


export default Clock; 