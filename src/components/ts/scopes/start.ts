import Button from  '../ui/button';
import {Container, Application} from 'pixi.js';
import BaseScope from './BaseScope';
import type Router from '../router';
class StartScope extends BaseScope{
    menuContainer:Container;
    constructor(app:Application,router:Router){
        super(app,router);
        this.menuContainer = new Container();
        this.scope = {
            name:'start',
            scope: {},
            state: {
                isActive:false
            },
            _state:{
                isActive:false
            },
            container: new Container(),
        }
    }
    create(){
        let startButton = new Button({
            text:'开始游戏',
        });
        this.addLoad(startButton); //预加载资源
        startButton.on('pointerup',(e: any)=>{
            this.router.routerTo('game');
        });
        let buttonContainer = new Container();
        startButton.appendTo(buttonContainer);
        this.menuContainer.addChild(buttonContainer);
    }
    
    mount(){
        
        this.scope.container.addChild(this.menuContainer);
        console.log('mounted');
        
    }
    init(){
        this.menuContainer.x = (this.app.screen.width - this.menuContainer.width)/2
    }
    gameLoop(){
        console.log('gamming');
    }
}


export default StartScope;