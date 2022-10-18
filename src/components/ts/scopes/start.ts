import type {SCOPE} from '../../../../mathgame';
import Button from  '../ui/button';
import {Container, Application} from 'pixi.js';
import type Router from '../router';
class StartScope {
    app:Application;
    scope:SCOPE;
    router:Router;
    constructor(app:Application,router:Router){
        this.app = app;
        this.router = router
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
        })
        button.on('pointerup',(e: any)=>{
            this.router.routerTo('game');
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