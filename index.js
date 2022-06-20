import {ue, ue5, capitalize} from './unreal'

export default ({ store, options }) => {
    if (!options.useUnreal) {
        return false
    }

    const suffix = options.suffix || 'Store'
    const storeName = store.$id.replace(suffix, '')
    const delim = options.delimiter || '-'

    const addRequest = (key) => {
        const newKey = `set${capitalize(storeName)}${capitalize(key)}`
        let cb = () => {}
        if (typeof store[newKey] === 'function') {
            cb = store[newKey]        
        }

        const method = data => {
            cb(data)
            ue5(newKey, data)
            console.log(`${storeName}${delim}${newKey}`, data)
        }
        store[newKey] = method
    }

    const addInterface = (key) => {
        const newKey = `update${capitalize(storeName)}${capitalize(key)}`
        ue.interface[newKey] = (data) => {
            store.$state[key] = data
        }
    }
    
    for (const [k,v] of Object.entries(store.$state)) {
        addRequest(k)
        addInterface(k)
    }

    if (window) {
        window.ue = ue
    }
    return {}
};