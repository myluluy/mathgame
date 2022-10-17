import {Container,Text,Texture,Loader, Rectangle, Sprite,BaseTexture} from 'pixi.js';
import gamebutton from '../../assets/gamebutton.png';
class Button {
    onClick:Function = (e:any)=>{
        console.log('click:', this.text);
    };
    text:string = 'Button'; 
    private _button:Container;
    constructor(options:any) {
        if(typeof options.text === 'string') {
            this.text = options.text;
        }
        if(typeof options.onClick === 'function') {
            this.onClick = options.onClick;
        }
        this._button = new Container();
        this._build(options.style || {});
    }

    appendTo(container:Container) {
        container.addChild(this._button);
        
    }

    _build(style:any){
        const loader = Loader.shared;
        const text = new Text(this.text,{
            fontSize:420,
            fill:0xffffff,
            align:"center"
        });
        loader.add('btn',gamebutton)
        const texture = Texture.from(gamebutton);
        const button = new Sprite(texture);
        button.buttonMode = true;
        button.interactive = true;
        button.addChild(text);
        button.on('pointerdown',(e)=>{
                this.onClick.call(this,[e]);
            });
        this._button.addChild(button);
        loader.load((loader,resources) =>{
            let rectangle = new Rectangle(231,439, 2520,1199);
            texture.frame = rectangle;
            text.x = (this._button.width - text.width) /2;
            text.y = (this._button.height - text.height)/2 * 0.9;
            this._button.scale = {x:0.08,y:0.08}
            
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