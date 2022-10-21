import {Container, Application, Text} from 'pixi.js';
import BaseScope from './BaseScope';
import type Router from '../router';
import GameMain from '../game/GameMain'

class GameScope extends BaseScope{
    private gameMain:GameMain = new GameMain(); 
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
        console.log(this.gameMain.createQuestions());
        
    }
    
    mount(){
        
        console.log('mounted');
        
    }
    init(){
    }
    gameLoop(){
        this.gameMain.activeQuestion();
        let question = this.gameMain.getActiveQuestions();
        question.forEach((o,i)=>{
            if(o.frames === 0) {
                o.text = new Text(o.getFormula())
                this.scope.container.addChild(o.text);
            }
            o.frames+=o.speed; 
            o.text.y = o.frames;
            
        })

    }
}


export default GameScope;