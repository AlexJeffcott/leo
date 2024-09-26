import { type FunctionalComponent } from 'preact'

export const ChevronLeft: FunctionalComponent<{ class?: string }> = (
    { class: className },
) => (
    <svg
        class={className}
        viewBox='0 0 12 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M8 1 L3 6 L8 11'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            stroke='var(--color)'
        />
    </svg>
)
