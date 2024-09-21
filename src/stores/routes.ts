import { signal, type Signal } from '@preact/signals'

type RouteNames = 'welcome' | 'spelling' | 'maths'

export class Routes {
    currentRoute: Signal<RouteNames>
    constructor() {
        this.currentRoute = signal('welcome')
    }
    setCurrentRoute(route: RouteNames) {
        this.currentRoute.value = route
    }
}