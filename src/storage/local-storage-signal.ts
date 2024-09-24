import { effect, type Signal, signal } from '@preact/signals-core'

type Value = string | null

const cache: Map<string, Signal<Value>> = new Map()

self.addEventListener('storage', onStorageEvent)

export function localStorageSignal<T extends Value>(key: string, defaultValue: T): Signal<T> {
    const possibleSig = cache.get(key)

    if (possibleSig) {
        return possibleSig as Signal<T>
    }

    let initialValue: T

    const currentValue = window.localStorage.getItem(key)

    if (currentValue === null) {
        if (defaultValue !== null) {
            window.localStorage.setItem(key, defaultValue)
        }

        initialValue = defaultValue
    } else {
        initialValue = currentValue as T
    }

    const sig = signal<T>(initialValue)

    effect(() => {
        if (sig.value === null) {
            window.localStorage.removeItem(key)
        } else {
            window.localStorage.setItem(key, sig.value)
        }
    })

    cache.set(key, sig)

    return sig
}

function onStorageEvent(event: StorageEvent): void {
    if (event.key === null) { return }

    const sig = cache.get(event.key)

    if (sig) {
        sig.value = event.newValue as Value
    }
}
