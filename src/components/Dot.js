import React, {useState} from 'react'
import './Dot.css';

const Dot = ( props ) => {
    const [location, setLocation] = useState({
        i:11, 
        j:15
    })
    return ( 
        <div className="dot" key={1}>
        </div>
    ); 
}

export default Dot; 