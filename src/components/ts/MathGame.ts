
import type {SCOPES,SCOPE} from '../../../mathgame';
import {Application,utils,Container} from 'pixi.js';
import router from '../ts/router';
class MathGame {
    PIXI: any;
    app:Application = new Application() ;
    SCOPES:SCOPES = {};
    state:any = {};
    constructor (){
        let type = "WebGL"
        if(!utils.isWebGLSupported()){
            type = "canvas"
        }
        this.init();
    }

    init(){
        let app = this.app;
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.backgroundColor = 0xfcda93;
        // app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        this.state.currRoute = 'start';
        this.routerTo('start');
        app.ticker.add(()=>{
            this.running();       
        })
    }
    appendTo(dom:Element) {
        dom.appendChild(this.app.view);
    }

    running(){
        let currRoute = router[this.state.currRoute]
        if(!currRoute) {
            return;
        }
        currRoute.gameLoop();
    }


    routerTo(scopeName:string, state?:any, destory?:Boolean) {
        let route = router[scopeName];
        let fromScope = this.state.currRoute ? router[this.state.currRoute] : null;
        if(!route || !route.gameLoop) {
            return;
        }
        let scope:SCOPE = route.scope;
        this.app.stage.removeChild(fromScope);
        this.app.stage.addChild(scope.container);
        scope.state.isActive = true;
        this.state.currRoute = scope.name;
        if(fromScope && destory) {  // 销毁当前场景
            this.destory(fromScope);
        }


    }

    destory(scope:SCOPE) {
        if(scope) {
            scope.state.isActive = false;
            scope.scope = {}
            scope.state = scope._state;
            scope.container.destroy();
        }
    }

}

export default MathGame
