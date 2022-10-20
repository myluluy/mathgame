import Button from  '../ui/button';
import {Container, Application} from 'pixi.js';
import BaseScope from './BaseScope';
import type Router from '../router';
import GameMain from '../game/GameMain'

class GameScope extends BaseScope{
    constructor(app:Application,router:Router){
        super(app,router);
        this.scope = {
            name:'game',
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
        let gameMain = new GameMain();
        console.log(gameMain.createQuestions());
    }
    
    mount(){
        
        console.log('mounted');
        
    }
    init(){
    }
    gameLoop(){
        console.log('gamming');
    }
}


export default GameScope;