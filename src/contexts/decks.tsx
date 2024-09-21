import { type Decks } from '@/stores/decks.ts'
import { createContext, type FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'

const Context = createContext<{ store?: Decks }>({})

export function useDecksStore(): Decks {
    const value = useContext(Context)

    if (!value.store) {
        throw new Error('store context value is missing')
    }

    return value.store
}

export const DecksContextComponent: FunctionalComponent<{ store: Decks }> = (
    { children, store },
) => <Context.Provider value={{ store }}>{children}</Context.Provider>
