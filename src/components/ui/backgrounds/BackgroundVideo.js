import React from 'react';
import video1 from "./videos/afternoon_beach_aerial.mp4"; 
import video2 from "./videos/afternoon_morning_summer_urban.mp4" ; 
import video3 from "./videos/background1.mp4" ; 
import styles from "./backgroundVideo.module.css" ; 

const videos = [
    video1, 
    video2, 
    video3
]

const selectVideo = ()=>{
    return videos[Math.floor(Math.random()*videos.length)]; 
}

export default class BackgroundVideo extends React.Component {  

    _isMounted = false; 

    constructor(props) {
        super( props ); 
    }

    render(){

        /*const date = this.props.date === null
        ? null
        : ((this.props.date.split('T')[1]).split('-')[0]).split(':'); */


        return (
            <video  className={styles.backgroundVideo}
            playsInline autoPlay muted loop src={video1} 
            type="video/mp4">
            </video>)
    }
}