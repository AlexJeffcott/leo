import { useMemo, useRef } from 'preact/hooks'

// NOTE: creates a stable variable (this could be a primitive or a callback function).
// NOTE: it should only be created once - onMount.
export function useStableVariable<T>(variable: T): T {
    const ref = useRef<T>(variable)
    return useMemo(() => {
        if (ref.current === null) {
            ref.current = variable
        }
        return ref.current
    }, [ref])
}
