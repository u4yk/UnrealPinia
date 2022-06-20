import {ue, ue5} from './unreal'

export default ({ store, options }) => {
    if (!options.useUnreal) {
        return false
    }
    const state = JSON.parse(JSON.stringify(store.$state))
    const suffix = options.suffix || 'Store'
    const storeName = store.name.replace(suffix, '')

    const addRequest = (key) => {
        const newKey = `set${storeName}${key}`
        let cb = () => {}
        if (typeof store[newKey] === 'function') {
            cb = store[newKey]        
        }

        const method = data => {
            cb(data)
            ue5(newKey, data)
        }
        store[newKey] = method
    }

    const addInterface = (key) => {
        const newKey = `update${storeName}${key}`
        ue.interface[newKey] = (data) => {
            store.$state[key] = data
        }
    }
    
    for (const [k,v] of Object.entries(state)) {
        addRequest(k)
        addInterface(k)
    }
    return {}
};