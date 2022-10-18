
import type {SCOPES,SCOPE} from '../../../mathgame';
import {Application,utils,Container} from 'pixi.js';
import Router from '../ts/router';
class MathGame {
    PIXI: any;
    app:Application = new Application() ;
    SCOPES:SCOPES = {};
    state:any = {};
    router:Router;
    constructor (){
        let type = "WebGL"
        if(!utils.isWebGLSupported()){
            type = "canvas"
        }
        this.router = new Router(this.app)
        this.init();
    }

    init(){
        let app = this.app;
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.backgroundColor = 0xfcda93;
        // app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        this.router.routerTo('start');
        app.ticker.add(()=>{
            this.running();       
        })
    }
    appendTo(dom:Element) {
        dom.appendChild(this.app.view);
    }

    running(){
        if(!this.router.currRoute) {
            return;
        }
        this.router.currRoute.gameLoop();
    }


    

}

export default MathGame
