import React from 'react';
import styles from "./GameContainer.module.css"; 
import GameGrid from "./GameGrid"; 
import Clock from "../clock/Clock" ; 
import BackgroundVideo from "../ui/backgrounds/BackgroundVideo"

export default class GameContainer extends React.Component {  

    _isMounted = false; 
    constructor(props) {
        super(props);
        this.state = {
            clientWidth:null, 
            clientHeight:null, 
            date : null
        } 
        this.onResize = this.onResize.bind( this );   
        this.tick = this.tick.bind( this ) ; 
    }

    componentDidMount(){
        this._isMounted = true; 
        if(this._isMounted){   
            window.addEventListener('resize', this.onResize); 
            this.onResize(); 
        }
      }

    componentWillUnmount(){
        window.removeEventListener('resize', this.onResize); 
      }
    
    onResize(){
        if(typeof window !== "undefined"){
            this.setState({
                clientWidth: window.innerWidth,
                clientHeight:window.innerHeight
            });
        }
    }

    tick( date ){
        this.setState({date}); 
    }

    render() {
        console.log(this.state.clientWidth)
        console.log(this.state.clientHeight)
        return (
            <div className={styles.gameContainer}>
                <BackgroundVideo></BackgroundVideo>
               <div className={styles.clientViewArea}>
                    <div className={styles.clock}>
                        <Clock tick={this.tick}></Clock>
                    </div>
                    <GameGrid clientWidth={'100px'} clientHeight={'300px'}/>
                </div>
            </div>
       );
    }
}; 
