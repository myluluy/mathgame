import type { ListenerFn } from 'eventemitter3';
import {Container,Text,Texture,Loader, Rectangle, Sprite,BaseTexture, Application, type IPointData} from 'pixi.js';
import gamebutton from '../../assets/gamebutton.png';

/**load assets */

const loader = Loader.shared;
loader.add('btn',gamebutton)

class Button {
    
    text:string = 'Button'; 
    _button:Container;
    readonly size:number;
    loaded:boolean = false;
    parent:Container|null = null;
    constructor( options:any) {
        if(typeof options.text === 'string') {
            this.text = options.text;
        }
        
        this._button = new Container();
        this._button.buttonMode = true;
        this._button.interactive = true;
        this.size = options.size||0.08;
        this._build()
    }
    set(point:IPointData) {
        this._button.x = point.x;
        this._button.y = point.y;
    }
    on:Function = (event:string,fn: ListenerFn)=>{
        this._button.on(event, fn)
    };
    appendTo(container:Container) {
        container.addChild(this._button);
        this.parent = container;
    }

    // align(align:string='center') {
    //     switch (align) {
    //         case 'left':
    //             this._button.x = 0;
    //         break;
    //         case 'center':
    //             this._button.x =  100;
    //         break;
    //         case 'right':
    //             this._button.x =  200;
    //         break;
    //         default:
    //             this._button.x =  100;
    //         break;
    //     }
    // }

    private _build(){
        const text = new Text(this.text,{
            fontSize:420,
            fill:0xffffff,
            align:"center"
        });
        const texture = Texture.from(gamebutton);
        const button = new Sprite(texture);
        button.addChild(text);
        this._button.addChild(button);
        this._button.scale = {x:this.size,y:this.size}
        loader.load((loader,resources) =>{
            let rectangle = new Rectangle(231,439, 2520,1199);
            texture.frame = rectangle;
            text.anchor.x = -0.25;
            text.anchor.y = -0.70;
            this.loaded = true;
        })
        
    }

    // _buildbak(style:any) {
    //     style = style || {}
    //     style = Object.assign({
    //         backgroundColor:0x000000,
    //         borderColor: 0xffffff,
    //         height: 50,
    //         radius: 25,
    //         x:  10,
    //         y:  100,
    //         padding: 5,
    //         fontSize:12,
    //         fontColor:0xffffff,
    //         fontAlign:'center',
    //         fontFamily:'Arial'
    //     },style);
    //     style.width = this.text.length * (style.height - 10);
    //     
    //     
    //     let text = new Text(this.text,{fontFamily : style.fontFamily, 
    //         fontSize: style.fontSize,
    //         fill : style.fontColor, 
    //         align : style.fontAlign})
    //     
    //     this._button.beginFill(style.borderColor);
    //     this._button.drawRoundedRect(style.x,style.y,style.width,style.height,style.radius) ;
    //     let inner = new Graphics();
    //     inner.beginFill(style.backgroundColor);
    //     inner.drawRoundedRect(style.x + style.padding,style.y + style.padding ,style.width - style.padding*2 , style.height - style.padding * 2,style.radius);
    //     text.x = style.x + style.padding;
    //     text.y = style.y + style.padding;
    //     text.width = style.width - style.padding*2
    //     text.height = style.height - style.padding *2
    //     inner.addChild(text);
    //     this._button.addChild(inner);
    // }

}

export default Button;