export function cx(...args: Array<string | boolean | undefined>): string {
    return args.filter(Boolean).join(' ')
}