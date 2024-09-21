import { type Routes } from '@/stores/routes.ts'
import { createContext, type FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'

const Context = createContext<{ store?: Routes }>({})

export function useRoutesStore(): Routes {
    const value = useContext(Context)

    if (!value.store) {
        throw new Error('store context value is missing')
    }

    return value.store
}

export const RoutesContextComponent: FunctionalComponent<{ store: Routes }> = (
    { children, store },
) => <Context.Provider value={{ store }}>{children}</Context.Provider>
