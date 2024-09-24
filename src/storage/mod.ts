// import { localStorageSignal } from '@/storage/local-storage-signal.ts'
// import { computed, type Signal } from '@preact/signals'

// export type GroupBy = 'standard' | 'day'

// export const maxStorageLength = 100

// export const bvSignalStorage = localStorageSignal<string>(
//     '--group-by-v1-storage',
//     JSON.stringify([])
// )

// const bvComputed = computedFromStorage()

// export function computedFromStorage(storage = bvSignalStorage) {
//     return computed(() => deserialize(storage.value))
// }

// export function groupByFor(id: string, sig = bvComputed): GroupBy {
//     if (sig.value.has(id)) {
//         return 'day'
//     } else {
//         return 'standard'
//     }
// }


// // how do I use generics with classes?
// export class BinaryValueStorage {
//     #storageSignal: Signal<string>

//     constructor(type: 'session' | 'local', storageKey: string, values: [string, string]) {
//         this.#storageSignal.value = type === 'local' ? localStorageSignal
//     }

//     toggleFor(
//         id: string,
//         sig = bvComputed,
//         storage = bvSignalStorage
//     ): void {
//         const set = sig.value

//         if (set.has(id)) {
//             set.delete(id)
//         } else {
//             set.add(id)
//         }

//         storage.value = serialize(set)
//     }
// }

// function serialize(ids: Set<string>): string {
//     let array = Array.from(ids)

//     if (array.length > maxStorageLength) {
//         array = array.slice(array.length - maxStorageLength)
//     }

//     return JSON.stringify(array)
// }

// function deserialize(string: string): Set<string> {
//     let array: string[] = []

//     try {
//         array = JSON.parse(string)

//         if (!Array.isArray(array)) {
//             throw new Error('not an array')
//         }
//     } catch {
//         return new Set()
//     }

//     return new Set(array)
// }
