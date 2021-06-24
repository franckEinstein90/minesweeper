import React from 'react';
import { MinegrinderApp } from "../../../Alpha/MinegrinderApp" ; 
import {today } from "../../../Alpha/time/day/days"; 
import styles from "./TopNav.module.scss"; 

class TopNav extends React.Component {  

    constructor(props) {
        super(props);
        this.state={
            today:null 
        }
    }

    async componentDidMount() {
        const d = await today();
        console.log(d) ; 
        this.setState({today:d}); 
    }


    render() {
        const todayStateLoaded = 'today' in this.state && this.state.today !== null ;
        const dayRep = todayStateLoaded ? (this.state.today).toString : 'NaN' ; 
        const sunset = todayStateLoaded ? this.state.today.description.sunset : 'NaN' ; 
        const todayWidth = todayStateLoaded 
            ? this.state.today.timeLeft*100
            :'50%';
        if(todayStateLoaded) {
            console.log(this.state.today) ; 
        }
        return (
            <div className={styles.topNav}>
                    <div style={{width:`${todayWidth}%`}}>{dayRep}</div>
                    <div>Sunset: {sunset}</div>
            </div>
       );
    }
}


export default TopNav; 