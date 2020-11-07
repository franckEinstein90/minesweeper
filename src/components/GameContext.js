/*********************************************************
 * 
 *********************************************************/
import { checkPropTypes } from 'prop-types';
import React, {useState, createContext} from 'react'; 


import PlayerEnroll from "./player/PlayerEnroll";
import Grid from "./Grid"; 

export const GameContext = createContext(); 

const cacheName = 'mindGrinder'; 
const playerInfoKey = 'PLAYER_INFO'

const checkCache = async function(){

    const checkCache = 'caches' in window ; 
    if(checkCache === null) throw "cache api not available" ; 
    return caches.open(cacheName) 
  
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

        return checkCache()
        .then( gameCache => gameCache.match( playerInfoKey ) )  
        .then ( player => player !== undefined 
            ? readPlayerInfo([], player.body.getReader()) 
            : null )
        .then( readerText => {
            if( readerText ){
                let info = JSON.parse(new TextDecoder("utf-8").decode(readerText[0]))
                this.setState({
                    playerName: info.name
                })
            }
        })
    }

    storePlayerName( playerName ){

        this.setState({playerName})
        return checkCache()
        .then( gameCache => {
            gameCache.put('/' +  playerInfoKey, new Response(
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
                {this.state.playerName? this.game() : this.newPlayerEnroll()}
            </GameContext.Provider>
        );
    } 
}