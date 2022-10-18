
import type { SCOPE, SCOPES } from 'mathgame';
import type { Application } from 'pixi.js';
import StartScope from '../ts/scopes/start';
import game from '../ts/scopes/start';


class Router {
    app:Application
    currRoute:any;
    scopes:any;
    constructor(app:Application){
        this.app = app;
        const startScope = new StartScope(app);
        this.scopes = {
            'start':startScope
        }
    }
    routerTo(scopeName:string, state?:any, destory?:Boolean) {
        let route = this.scopes[scopeName];
        let fromScope = this.currRoute ? this.currRoute : null;
        let scope:SCOPE = route.scope;
        if(fromScope) {
            this.app.stage.removeChild(fromScope);
        }
        this.app.stage.addChild(scope.container);
        scope.state.isActive = true;
        this.currRoute = this.scopes[scopeName];
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
export default Router;