import type {SCOPE} from '../../../../mathgame';
import {Container, Application} from 'pixi.js';
import type Router from '../router';
class BaseScope {
    app:Application;
    router:Router;
    private loadingList:any[] = [];
    status:string = 'pending' // created, loaded,mounted,inited, running
    scope:SCOPE;
    constructor(app:Application,router:Router){
        this.app = app;
        this.router = router;
        this.scope = {
            name:'',
            scope: {},
            state: {},
            _state:{},
            container: new Container(),
        }
    }

    reset(){
        this.loadingList= [];
        this.status = 'pending';
    }

    addLoad(item:any){
        this.loadingList.push(item);
    }

    create(){
    }
    private loading(){
        if(this.loadingList.length === 0) { //不需要loading;
            return true;
        }
        let loaded = true;
        for (let i = 0; i< this.loadingList.length; i++) {
            let item = this.loadingList[i];
            console.log(item.loaded)
            if(item.loaded  === false) {
                loaded = item.loaded;
                break;
            }
        }
        return loaded;
    }
    mount(){
        
    }
    init(){
    }
    gameLoop(isFirst?:Boolean){
    }

    cycle(){
        switch (this.status) {
            case 'pending':
                this.create();
                this.status = 'created';
            break;
            case 'created':
                if(this.loading()) {
                    this.status = 'loaded';
                }
            break;
            case 'loaded':
                this.mount()
                this.status = 'mounted';
            break;
            case 'mounted':
                this.init();
                this.status ='inited';
            break;
            case 'inited':
                this.gameLoop(true);
                this.status = 'running';
            break;
            case 'running':
                this.gameLoop();
            break;
            default:
                throw Error('未知的运行状态');
        }
    }
}

export default BaseScope;