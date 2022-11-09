import { Container, Graphics, type IPointData } from "pixi.js";


export default class DrawPen {
    private width:number = 1;
    private color:number = 0xFFFFFF;
    private status:number = 0;
    private graphics:Graphics = new Graphics();
    constructor(width:number,color:number){
        this.setLineStyle(width,color);
    }

    setLineStyle(width:number = 1,color:number=0xFFFFFF) {
        this.width = width;
        this.color = color
        this.graphics.lineStyle(this.width,this.color,1);
    }
    getWidth(){
        return this.width;
    }

    getColor() {
        return this.color;
    }

    drawDown(point:IPointData){
        this.graphics.moveTo(point.x,point.y);
        this.graphics.lineTo(point.x,point.y);

    }
    draw(point:IPointData){
        debugger;
        this.graphics.lineTo(point.x,point.y);
    };
    clear(){
        this.graphics.clear();
    }

    bind(container:Container){
        container.addChild(this.graphics);
        container.on('pointerdown',(event)=>{
            console.log('pointerdown')
            this.status = 1;
            this.drawDown(container.position);
        });
        container.on('pointerup',(event)=>{
            console.log('pointerup')
            this.status = 0;
        });
        container.on('pointerupoutside',(event) =>{
            console.log('pointerupoutside')
            this.status = 0;
        })
        container.on('pointermove',(event)=>{
            if(this.status === 1) {
                console.log('pointermove')
                this.draw(container.position);
            }
        })
    }
}