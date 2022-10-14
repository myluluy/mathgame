import type {SCOPE} from '../../../../mathgame';
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
    let rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    scope.container.addChild(rectangle);
    scope.state.isInit = true;
    scope.scope.rectangle = rectangle;
}
export default {
    scope,
    gameLoop(){
        if(!scope.state.isInit) {
            init();
        } else {
            scope.scope.rectangle.y++;
        }

        //console.log('[',scope.name,'] isActive:',scope.state.isActive);
    }
}