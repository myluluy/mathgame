import { Application, Container, Graphics, Text } from "pixi.js";
import type DrawPen from "../tools/drawPen";

class DrawBoard {
    private readonly _board:Container;
    pen!:DrawPen;
    constructor(){
        this._board = new Container();
        this._board.interactive = true;
        this._build();
        
    }


    appendTo(app:Application, drawPen:DrawPen) {
        app.stage.addChild(this._board);
        const graphics = new Graphics();
        graphics.interactive = true;
        graphics.beginFill(app.renderer.backgroundColor || 0xFFFFFF,1);
        graphics.drawRect(app.screen.x, app.screen.y, app.screen.width, app.screen.height);
        graphics.endFill();
        this._board.addChild(graphics);
        drawPen.bind(this._board);
        this.pen = drawPen;
    }

    private _build(){
        
        // this._board.mask = graphics;
    }

}

export default DrawBoard;