export default class EventEmmiter
{
    #events = new Map<string,[(...args:any)=>any]>()
    constructor() {
        
    }
    emit (eventName:string,...args:any)
    {
        if (this.#events.has(eventName))this.#events.get(eventName).forEach((l) =>l(args))
    }

    on (eventName: string, listener: (...args:any) => any)
    {
        if (this.#events.has(eventName))this.#events.get(eventName).push(listener)    
        else this.#events.set(eventName, [listener])
    }
}