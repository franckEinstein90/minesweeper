import { checkPropTypes } from 'prop-types';
import React, {useState, createContext} from 'react'; 

export const GameContext = createContext(); 


const cacheInfoHandler = async function(){
    const checkCache = 'caches' in window
    if(checkCache === null) throw "cache api not available" 
    return caches.open('mineGrinder') 
}

const readPlayerInfo = async function( result, playerInfoReadableStream ){
    // read() returns a promise that resolves
    // when a value has been received
    return new Promise((resolve, reject)=> {
        return playerInfoReadableStream.read()
        .then(function processText({ done, value }) {
      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
            if (done) {
                console.log("Stream complete");
                return resolve(result);
            } else {
                result.push(value)
                return resolve( readPlayerInfo(result, playerInfoReadableStream))
            }
        })
    })
}

export class GameProvider extends React.Component {

    constructor( props )   {
        super(props);
        this.state = {
            playerName: 'anonymous'
        } 
        /*const [dotLocation, setDotLocation] = useState([
        {
            i:11, 
            j:15
        }
        ]); */
    } 

    componentDidMount(){

        let gameCache = null; 
        return cacheInfoHandler()
        .then( gc => {
            gameCache = gc
            return gameCache.match('PLAYER_NAME')
        })
        .then ( player => {
            if(player === undefined){ //No stored player name, create
                return gameCache.put('/PLAYER_INFO', new Response(
                    '{"name": "Player 1"}'
                ));
            } else {
                let reader = player.body.getReader(); 
                return readPlayerInfo([], reader )
            }
        })
        .then( readerText => {
            debugger
            return 1
        })
    }

    render() {
        return (
            <GameContext.Provider value={'fdsa'}>
                {this.props.children}
            </GameContext.Provider>
        );
    } 
}