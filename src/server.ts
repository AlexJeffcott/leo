import {
  bundleInDenoDeploy,
  forPreact
  // } from '../../deno-esbuild/src/mod.ts'
} from 'deno-esbuild'
import { Hono } from 'hono'
import { serveStatic } from 'hono/deno';
import * as esbuild from "https://deno.land/x/esbuild@v0.24.0/wasm.js"
import { contentType } from '@std/media-types'

const app = new Hono()


// TODO: use Deno.PermissionStatus to check that we are not trying to use --allow-run
// which would break deno deploy
// Deno.PermissionStatus

// TODO: should I cache the esbuild wasm so I can reuse it between server runs?

async function makeBundle() {
  const cfg = await forPreact({
    entryPoints: ['./src/main.tsx'],
    write: false,
  }, 'deno.jsonc', 'dev', 'browser', '.env')


  return bundleInDenoDeploy(cfg, esbuild.build, esbuild.initialize, esbuild.stop)
}

const result = await makeBundle()
result.errors.forEach(console.error)
result.warnings.forEach(console.warn)
if (result?.outputFiles === undefined) {
  throw new Error('result.outputFiles should be defined')
}

let scripts = ''
let styles = ''

const fileTypes = ['jpg', 'jpeg', 'png', 'woff2']

for (const out of result.outputFiles) {
  // does deno have a lib for getting the fileName?
  const fileName = out.path.split('/').pop() || 'undefined.js'
  // does deno have a lib for getting the ext?
  const ext = fileName.split('.').pop()
  const path = `/${fileName}`

  app.get(path, () => new Response(
    new File(
      !fileTypes.includes(ext || 'txt') ? [out.text] : [out.contents.buffer],
      fileName,
      { type: contentType(ext || 'txt') },
    ),
  ))

  if (ext === 'css') {
    styles = `${styles}\n<link rel="stylesheet" type="text/css" href="${path}">`
  } else if (ext === 'js' || ext === 'mjs') {
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
