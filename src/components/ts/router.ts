
import type { SCOPE, SCOPES } from 'mathgame';
import type { Application } from 'pixi.js';
import StartScope from '../ts/scopes/start';
import GameScope from '../ts/scopes/game';


class Router {
    app:Application
    currRoute:any;
    scopes:any;
    routeAction:Function | undefined;
    state:number = 0; // 0 正常状态， 1 跳转中,
    constructor(app:Application){
        this.app = app;
        const startScope = new StartScope(app,this);
        const gameScope = new GameScope(app,this);
        this.scopes = {
            'start':startScope,
            'game':gameScope
        }
    }
    routerTo(scopeName:string, state?:any, destory?:Boolean) {
        this.state = 1;
        let route = this.scopes[scopeName];
        let fromScope = this.currRoute ? this.currRoute : null;
        this.currRoute = this.scopes[scopeName];
        let scope:SCOPE = route.scope;
        let alpha = 10; //因为浮点精度问题，这里先用倍数
        let alphaB = 0;
        scope.container.alpha = alphaB;
        const inAction = ()=>{
            this.app.stage.addChild(scope.container);
            alphaB++;
            scope.container.alpha = alphaB/10;
            if(alphaB === 10) {
                this.routeAction = undefined;
                this.state = 0;
            }
            
        };
        const outAction = ()=>{
            if(fromScope) {
                // 淡出老界面
                alpha --;
                fromScope.scope.container.alpha = alpha/10
                if (alpha === 0) {
                    this.app.stage.removeChild(fromScope.scope.container);
                    if(fromScope && destory) {  // 销毁当前场景
                        this.destory(fromScope.scope.container);
                    }
                    this.routeAction = inAction;
                }
            } else {
                    this.routeAction = inAction;
                    
            }
            
        };
        this.routeAction = outAction;
        


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
export default Router;