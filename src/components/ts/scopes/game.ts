import type {SCOPE} from '../../../../mathgame';
import {Container} from 'pixi.js';
let scope:SCOPE = {
        name:'game',
        scope: {},
        state: {
            isActive:false
        },
        _state:{},
        container: new Container(),
    }
export default {
    scope,
    gameLoop(){
        console.log('[',scope.name,'] isActive:',scope.state.isActive);
    }
}