import { type FunctionalComponent } from 'preact'
import {
    DecksContextComponent,
    RoutesContextComponent,
} from '@/contexts/mod.ts'
import { Decks, Routes } from '@/stores/mod.ts'

const decksStore = new Decks()
const routesStore = new Routes()

export const Providers: FunctionalComponent = ({ children }) => (
    <RoutesContextComponent store={routesStore}>
        <DecksContextComponent store={decksStore}>
            {children}
        </DecksContextComponent>
    </RoutesContextComponent>
)
