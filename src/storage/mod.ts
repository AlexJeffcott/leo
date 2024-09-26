// import { localStorageSignal } from '@/storage/local-storage-signal.ts'
// import { sessionStorageSignal } from '@/storage/local-storage-signal.ts'
import { computed, type Signal, type ReadonlySignal, signal } from '@preact/signals'

export type GroupBy = 'standard' | 'day'

export const maxStorageLength = 100

export const bvSignalStorage = localStorageSignal<string>(
    '--group-by-v1-storage',
    JSON.stringify([])
)

const bvComputed = computedFromStorage()

export function computedFromStorage(storage = bvSignalStorage) {
    return computed(() => deserialize(storage.value))
}

export function groupByFor(id: string, sig = bvComputed): GroupBy {
    if (sig.value.has(id)) {
        return 'day'
    } else {
        return 'standard'
    }
}

type SN = string | null

// this keeps an in-memory version of the deserialized storage string
const cache: Map<string, Signal<[string, string | null]>> = new Map()
export class BinaryValuePersistance<T extends SN, V extends SN> {
    #sig: Signal<T | V>
    bvPersistance: ReadonlySignal<T | V>
    constructor(type: 'session' | 'local', key: string, initial: T) {
        this.#sig = signal(initial)
        this.bvPersistance = computed(() => {
            this.#sig.value
        })
    }

    toggleFor(
        id: string,
        sig = bvComputed,
        storage = bvSignalStorage
    ): void {
        const set = sig.value

        if (set.has(id)) {
            set.delete(id)
        } else {
            set.add(id)
        }

        storage.value = serialize(set)
    }
}

function serialize(ids: Set<string>): string {
    let array = Array.from(ids)

    if (array.length > maxStorageLength) {
        array = array.slice(array.length - maxStorageLength)
    }

    return JSON.stringify(array)
}

function deserialize(string: string): Set<string> {
    let array: string[] = []

    try {
        array = JSON.parse(string)

        if (!Array.isArray(array)) {
            throw new Error('not an array')
        }
    } catch {
        return new Set()
    }

    return new Set(array)
}
