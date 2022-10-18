import type {SCOPE} from '../../../../mathgame';
import Button from  '../ui/button';
import {Container,Sprite,Graphics, Application} from 'pixi.js';
import router from '@/router';

class StartScope {
    app:Application;
    scope:SCOPE;
    constructor(app:Application){
        this.app = app;
        this.scope = {
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
    }
     init(){
        let button = new Button({
            text:'开始游戏',
            
            onClick: ((e:any) =>{
                console.log('aaa')
            })
        })
        let buttonContainer = new Container();

        button.appendTo(buttonContainer);
        this.scope.container.addChild(buttonContainer);
        this.scope.state.isInit = true;
        this.scope.scope.button =button;
    }
    gameLoop(){
        if(!this.scope.state.isInit) {
            this.init();
        } else {
        }
    }
}


export default StartScope;