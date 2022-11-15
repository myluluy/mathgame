import { Container, Graphics, type IPointData } from "pixi.js";

type PathPoint = {
    point:IPointData;
    isMoveTo?:Boolean;
}

type Path = PathPoint[];

export default class DrawPen {
    private width:number = 1;
    private lastPoint!:IPointData; //用来控制线条粒度
    private prevPoint!:IPointData;
    private color:number = 0xFFFFFF;
    private status:number = 0;
    private path:Path = [];
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
        this.lastPoint = {...point};
        this.path.push({
            isMoveTo:true,
            point:{...point}
        })
        this.status = 1;
    }
    draw(point:IPointData){
        if(Math.abs(this.lastPoint.x - point.x) >=1 || Math.abs(this.lastPoint.y - point.y) >=1) {
            this.path.push({point:{...point}});
            this.lastPoint = {...point};
        } else {
        }
        
    };
    render(){
        if(this.status === 1) {

            this.graphics.beginFill(0xFF0000,1)

            while (this.path.length !=0) {
                let point:PathPoint = <PathPoint>this.path.shift();
                if(point.isMoveTo ) {
                    this.graphics.moveTo(point.point.x,point.point.y);
                } else {
                    this.graphics.moveTo(this.prevPoint.x,this.prevPoint.y);
                }
                this.graphics.lineTo(point.point.x, point.point.y);
                this.prevPoint = point.point;
            }
            this.graphics.endFill()
        }
        
    }
    drawUp(){
        this.status = 0;
    }
    clear(){
        this.graphics.clear();
        this.path = [];
        this.lastPoint = {x:0,y:0}
        this.prevPoint = {x:0,y:0}
    }

    bind(container:Container){
        container.addChild(this.graphics);
        container.on('pointerdown',(event)=>{
            console.log('pointerdown')
            this.drawDown(event.data.global);
        });
        container.on('pointerup',(event)=>{
            this.drawUp()
            console.log('pointerup')
        });
        container.on('pointerupoutside',(event) =>{
            console.log('pointerupoutside')
            this.drawUp();
        })
        container.on('pointermove',(event)=>{
            if(this.status === 1) {
                console.log('pointermove')
                this.draw(event.data.global);
            }
        })
    }
}