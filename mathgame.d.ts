type SCOPE = {
        name:string;
        scope:any,
        state:any,
        _state:any,
        container:Container
    }

type SCOPES = {
    [key:string] : SCOPE
}



export {
    SCOPE,
    SCOPES
}