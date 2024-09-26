import { effect, type Signal, signal } from '@preact/signals-core'

type Value = string | null

const cache: Map<string, Signal<Value>> = new Map()

export function sessionStorageSignal<T extends Value>(key: string, defaultValue: T): Signal<T> {
    const possibleSig = cache.get(key)

    if (possibleSig) {
        return possibleSig as Signal<T>
    }

    let initialValue: T

    const currentValue = window.sessionStorage.getItem(key)

    if (currentValue === null) {
        if (defaultValue !== null) {
            window.sessionStorage.setItem(key, defaultValue)
        }

        initialValue = defaultValue
    } else {
        initialValue = currentValue as T
    }

    const sig = signal<T>(initialValue)

    effect(() => {
        if (sig.value === null) {
            window.sessionStorage.removeItem(key)
        } else {
            window.sessionStorage.setItem(key, sig.value)
        }
    })

    cache.set(key, sig)

    return sig
}
