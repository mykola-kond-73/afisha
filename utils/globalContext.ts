class GlobalContext {
    private static instance: GlobalContext | null

    constructor() {
        if (GlobalContext.instance) return GlobalContext.instance
        else GlobalContext.instance = this
    }

    private _onLoginModalCallback = () => { }
    private _refreshTocken=""
    private _signout=async ()=>{}
    private _getCinemasCallback=(page:number,filter:any)=>{}

    public getOnLoginModal(): () => void {
        return this._onLoginModalCallback
    }

    public setOnLoginModal(callback: () => void) {
        this._onLoginModalCallback = callback
    }

    public getRefreshTocken():string{
        return this._refreshTocken
    }

    public setRefreshTocken(tocken:string):boolean{
        this._refreshTocken=tocken
        return true
    }

    public deleteRefreshTocken():boolean{
        this._refreshTocken=""
        return true
    }

    public getSingOut=()=>{
        return this._signout
    }

    public setSingOut=(func:()=>Promise<void>):boolean=>{
        this._signout=func
        return true
    }

    public getCinemasCallback=()=>{
        return this._getCinemasCallback
    }

    public setCinemasCallback=(callback:(page:number)=>void)=>{
        this._getCinemasCallback=callback
        return true
    }
}

export const globalContext = new GlobalContext()