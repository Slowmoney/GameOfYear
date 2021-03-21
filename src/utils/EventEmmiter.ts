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
    }
    off (eventName: string, listener: (...args:any) => any)
    {
        
        if (this.#events.has(eventName))
        {
            const index = this.#events.get(eventName).indexOf(listener)
            if (index>0) this.#events.get(eventName).splice(index,1) 
        }
    }
}