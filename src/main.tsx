import { App } from '@/app.tsx'
import { render } from 'preact'
import { Providers } from '@/providers.tsx'
// NOTE: this inits the environment variables into globalThis.env
import '@/init-environment-variables.ts'
// NOTE: this ensures the global css is added to the main.css output
import '@/global.css'
// // NOTE: this ensures the favicon.ico is available to the in-memory bundler
// import favicon from '@/assets/favicon.ico'
// import webmanifest from '@/assets/site.webmanifest'
// console.log(favicon, webmanifest)

const element = document.getElementById('app')
if (element instanceof HTMLElement) {
  render(
    <Providers>
      <App />
    </Providers>,
    element,
  )
}
