


const OttawaCoordinates = {
    lat:45.4215, 
    lng:-75.6972
}



export const MinegrinderApp = (()=>{

    const _BOMB_PROB = 0.3;
    let _tick = 0; 

    const appTick = ()=>{
        _tick = _tick + 1; 
    }

    setInterval(
          () => appTick(),
          10000
        );

    return {
        bombProb : _BOMB_PROB , 
        coordinates : ()=>OttawaCoordinates, 
        get tick(){ return _tick }
    } ; 

})() ;


