import { Container, Graphics, Text } from "pixi.js";

class TextBlock {
    private _textBlock:Container;
    text:string='';
    constructor(text:string){
        this.text = text;
        this._textBlock = new Container();
        this._build();
        
    }



    private _build(){
        const text = new Text(this.text);
        const block = new Graphics();
        block.lineStyle(2, 0xFF00FF, 1);
        block.beginFill(0x650A5A, 0.25);
        block.drawRoundedRect(50, 440, 100, 100, 16);
        block.endFill(); 
        this._textBlock.addChild(block);
        block.addChild(text);
    }

}

export default TextBlock;