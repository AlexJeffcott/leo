import classes from '@/ui/components/button.module.css'
import { type FunctionalComponent } from 'preact'
import { cx } from '@/utils/mod.ts'

type ButtonProps = {
    text?: string
    onClick: () => void
    icon?: FunctionalComponent
    ariaLabel?: string
    class?: string
}

export const Button: FunctionalComponent<ButtonProps> = (
    { ariaLabel, class: className, icon: Icon, onClick, text },
) => (
    <button
        class={cx(classes.btn, !text && classes.rnd, className)}
        onClick={onClick}
        aria-label={ariaLabel}
    >
        {Icon && <Icon />}
        {text}
    </button>
)
