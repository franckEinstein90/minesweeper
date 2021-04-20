import React from 'react';
import { MinegrinderApp } from "../../../Alpha/MinegrinderApp" ; 
import {today } from "../../../Alpha/time/day/days"; 
import styles from "./TopNav.module.css"; 

class TopNav extends React.Component {  

    constructor(props) {
        super(props);
        this.state={
            today:null 
        }
    }

    async componentDidMount() {
        const d = await today(); 
        this.setState({today:d}); 
    }


    render() {
        const dayRep = ('today' in this.state && this.state.today !== null)
            ? (this.state.today).toString
            : 'NaN'

        return (
            <div className={styles.topNav}>
                    <div>{dayRep}</div>
                    <div>{MinegrinderApp.tick}</div>
                    <div>Link</div>
            </div>
       );
    }
}


export default TopNav; 