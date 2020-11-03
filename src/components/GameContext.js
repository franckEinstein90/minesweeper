/*********************************************************
 * 
 *********************************************************/
import { checkPropTypes } from 'prop-types';
import React, {useState, createContext} from 'react'; 


import PlayerEnroll from "./player/PlayerEnroll";
import Grid from "./Grid"; 

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
            playerName: null 
        }
        this.storePlayerName = this.storePlayerName.bind( this ) ; 
       
    } 

    componentDidMount(){

        let gameCache = null; 
        return cacheInfoHandler()
        .then( gc => {
            gameCache = gc
            return gameCache.match('PLAYER_INFO')
        })
        .then ( player => {
            if(player !== undefined){ //No stored player name, create
                let reader = player.body.getReader(); 
                return readPlayerInfo([], reader )
            }
        })
        .then( readerText => {
            if(Array.isArray(readerText)){
                const info = JSON.parse(new TextDecoder("utf-8").decode(readerText[0]))
                this.setState({
                    playerName: info.name
                })
            }
            return 1
        })
    }

    storePlayerName( playerName ){
        this.setState({playerName})
        //store the name in the cache
        return cacheInfoHandler()
        .then( gameCache => {
            gameCache.put('/PLAYER_INFO', new Response(
                `{"name": "${playerName}"}`
            ));
        })
   }

    newPlayerEnroll(){
        return (
            <>
                <PlayerEnroll storePlayerName={this.storePlayerName}/>
            </>
        )
    }

    game(){
        return (
            <>
                <Grid id="grid" playerName={this.state.playerName} rows={20} cols={20}/>
                {this.props.children}
            </>
        ); 
    }

    render() {
        return (
            <GameContext.Provider value={'fdsa'}>
                {this.state.playerName?this.game():this.newPlayerEnroll()}
            </GameContext.Provider>
        );
    } 
}