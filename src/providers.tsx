import { type FunctionalComponent } from 'preact'
import { DecksContextComponent } from '@/contexts/decks.tsx'
import { RoutesContextComponent } from '@/contexts/routes.tsx'
import { Decks } from '@/stores/decks.ts'
import { Routes } from '@/stores/routes.ts'

const decksStore = new Decks()
const routesStore = new Routes()

export const Providers: FunctionalComponent = ({ children }) => (
    <RoutesContextComponent store={routesStore}>
        <DecksContextComponent store={decksStore}>
            {children}
        </DecksContextComponent>
    </RoutesContextComponent>
)
