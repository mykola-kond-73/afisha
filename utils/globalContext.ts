class GlobalContext {
    private static instance: GlobalContext | null

    constructor() {
        if (GlobalContext.instance) return GlobalContext.instance
        else GlobalContext.instance = this
    }

    private _onLoginModalCallback = () => { }
    private _refreshTocken=""

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
}

export const globalContext = new GlobalContext()