import { App } from '@/ui/app.tsx'
import { render } from 'preact'
import { Providers } from '@/contexts/providers.tsx'
// NOTE: this inits the environment variables into globalThis.env
import '@/init-environment-variables.ts'
// NOTE: this ensures the global css is added to the main.css output
import '@/ui/global.css'

const element = document.getElementById('app')
if (element instanceof HTMLElement) {
  render(
    <Providers>
      <App />
    </Providers>,
    element,
  )
}
