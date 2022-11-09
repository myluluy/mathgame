import {Container, Application, Text} from 'pixi.js';
import BaseScope from './BaseScope';
import type Router from '../router';
import GameMain from '../game/GameMain'
import exportImg from '../tools/exportImg';
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
        question.forEach(async (o,i)=>{
            if(o.frames === 0) {
                o.text = new Text(o.getFormula())
                o.startTimer = new Date().getTime();
                this.scope.container.addChild(o.text);
                
            }

            o.frames++; 
            let currProgress = ((new Date().getTime() -  o.startTimer ) / o.activeTimer) * this.app.screen.height;
            if(currProgress - o.text.y >1) { //数值过小时不渲染；
                o.text.y = currProgress
            }
            if( o.text.y > this.app.screen.height) {
                this.gameMain.doMissQuestionByActive(i);
            }
        })

    }
}


export default GameScope;