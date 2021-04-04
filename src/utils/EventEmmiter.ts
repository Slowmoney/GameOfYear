export default class EventEmmiter
{
    #events = new Map<string,[(...args:any)=>any]>()
    constructor() {
        
    }
    emit (eventName:string,...args:any)
    {
        if (this.#events.has(eventName))this.#events.get(eventName).forEach((l) =>l.apply(this,args))
    }

    on (eventName: string, listener: (...args:any) => any)
    {
        if (this.#events.has(eventName))this.#events.get(eventName).push(listener)    
        else this.#events.set(eventName, [listener])
        return ()=>this.off(eventName,listener)
    }
    once(eventName: string, listener: (...args:any) => any)
    {
        const func = (...args:any)=>{
            listener(args)
            this.off(eventName,func)
        }
        if (this.#events.has(eventName))this.#events.get(eventName).push(func)    
        else this.#events.set(eventName, [func])
        return ()=>this.off(eventName,func)
    }
    off (eventName: string, listener: (...args:any) => any)
    {
        if (this.#events.has(eventName))
        {
            const index = this.#events.get(eventName).indexOf(listener)
            if (index>-1) this.#events.get(eventName).splice(index,1) 
        }
    }
}