import { checkPropTypes } from 'prop-types';
import React, {useState, createContext} from 'react'; 

export const GameContext = createContext(); 

export const GameProvider = props => {
    const [dotLocation, setDotLocation] = useState([
        {
            i:11, 
            j:15
        }
    ]); 
    return (
        <GameContext.Provider value={'fdsa'}>
            {props.children}
        </GameContext.Provider>
    ); 
}