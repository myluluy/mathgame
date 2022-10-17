import type {SCOPE} from '../../../../mathgame';
import Button from  '../ui/button';
import {Container,Sprite,Graphics} from 'pixi.js';
let scope:SCOPE = {
        name:'start',
        scope: {},
        state: {
            isActive:false
        },
        _state:{
            isInit:false,
            isActive:false
        },
        container: new Container(),
    }
function init(){
    let button = new Button({
        text:'开始游戏',
        style:{},
    })
    button.appendTo(scope.container); 
    scope.state.isInit = true;
    scope.scope.button =button;
}
export default {
    scope,
    gameLoop(){
        if(!scope.state.isInit) {
            init();
        } else {
        }

        //console.log('[',scope.name,'] isActive:',scope.state.isActive);
    }
}