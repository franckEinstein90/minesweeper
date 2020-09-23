"use strict"; 

const constants = (function(){

    const _KEYS = [
        {symb:'j', code:74},
        {symb:'k', code: 75},
        {symb: 'h', code: 72},
        {symb: 'l', code:  76}, 

        {symb:'arrowDown', code: 40}, 
        {symb: 'arrowRight', code: 39}, 
        {symb: 'arrowUp', code: 38},
        {symb: 'arrowLeft', code: 37},
    ]
    const _BOMB_PROB = 0.3;
    return {
        KEYS : _KEYS, 
        BOMB_PROB: _BOMB_PROB
    }
})()




module.exports = {
    constants
}