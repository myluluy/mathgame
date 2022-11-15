import {Container, Application, Text} from 'pixi.js';
import BaseScope from './BaseScope';
import type Router from '../router';
import GameMain from '../game/GameMain'
import exportImg from '../tools/exportImg';
import DrawBoard from '../ui/drawBoard';
import DrawPen from '../tools/drawPen';
import TimeClock from '../tools/timeClock';
class GameScope extends BaseScope{
    private gameMain:GameMain = new GameMain(); 
    private drawBoard:DrawBoard = new DrawBoard();
    private drawPen:DrawPen = new DrawPen(3,0xFF0000);
    private timeClock!:TimeClock;
    private currTime!:string;
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
        this.drawBoard.appendTo(this.app,this.drawPen);
        this.timeClock = new TimeClock();
    }
    gameLoop(){
        let currTime = this.timeClock.getTime();
        if(this.currTime !== currTime) {
            console.log(this.timeClock.getTime());
            this.currTime = currTime;
        }
        this.gameMain.activeQuestion();
        let question = this.gameMain.getActiveQuestions();
        question.forEach(async (o,i)=>{
            if(o.frames === 0) {
                o.text = new Text(o.getFormula())
                o.startTimer = new Date().getTime();
                o.text.style.dropShadow = true;
                o.text.style.stroke = 'yellow';
                o.text.style.fontSize = 50;
                o.text.anchor.set(0.5);
                o.text.x = this.app.screen.width/2;
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
        this.drawBoard.pen.render();

    }
}


export default GameScope;