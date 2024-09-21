import {
  bundleWithWasm,
  forPreact
} from 'deno-esbuild'
import { Hono } from 'hono'
import { serveStatic } from 'hono/deno';

const app = new Hono()

const result = await makeBundle()

let scripts = ''
let styles = ''

if (result.outputFiles === undefined) {
  throw new Error('result.outputFiles should be defined')
}

for (const out of result.outputFiles) {
  const fileName = out.path.split('/').pop() || 'undefined.js'
  const ext = fileName.split('.').pop()
  const path = `/${fileName}`


  // if (ext === 'webmanifest') {
  //   manifestPath = path
  // } else if (ext === 'ico') {
  //   faviconPath = path
  // }

  app.get(path, () => {
    if (ext === 'css') {
      return new Response(
        new File(
          [out.text],
          fileName,
          { type: 'text/css' },
        ),
      )
    } else if (ext === 'woff2') {
      return new Response(
        new File(
          [out.contents.buffer],
          fileName,
          { type: 'font/woff2' },
        ),
      )
    } else if (ext === 'png') {
      return new Response(
        new File(
          [out.contents.buffer],
          fileName,
          { type: 'image/png' },
        ),
      )
    } else if (ext === 'jpg' || ext === 'jpeg') {
      return new Response(
        new File(
          [out.contents.buffer],
          fileName,
          { type: 'image/jpeg' },
        ),
      )
    } else {
      return new Response(
        new File(
          [out.text],
          fileName,
          { type: 'text/javascript' },
        ),
      )
    }
  })

  if (ext === 'css') {
    styles = `${styles}\n<link rel="stylesheet" type="text/css" href="${path}">`
  } else if (ext === 'js') {
    scripts = `${scripts}\n<script type="module" src="${path}"></script>`
  }
}

app.get('/', (c) => {
  return c.html(
    `<html>
        <head>
          <title>LEO: a learning app for an 8-year-old</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff">
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#2A2C30">
          <link rel="shortcut icon" href="/favicon.ico">
          ${styles}
          <link rel="manifest" href="/site.webmanifest">
        </head>
        <body>
        <div id="app"></div>
        ${scripts}
        </body>
      </html>`,
  )
})

// NOTE: everything in the src/assets folder is available on localhost
app.use('/*', serveStatic({ root: './src/assets' }))

Deno.serve({ port: 8000 }, app.fetch)

async function makeBundle() {
  const cfg = await forPreact({
    entryPoints: ['./src/main.tsx'],
    loader: {
      '.png': 'file', '.woff2': 'file'
    },
    write: false,
  }, 'deno.jsonc', 'dev', 'browser', '.env')

  return bundleWithWasm(cfg, false)
}