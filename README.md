# Leo

## A web-app for an 8-year-old

In this simple example of a Preact application, the server entrypoint `server.ts` both prepares the assets from source code and serves them in-memory (ie not saving them to disk) and exposes them on localhost on the port defined in the `PORT` environment variable.

Running the command `deno task start` will start the server. Changing any files under the `src` dir while the server is running will restart it. It does not implement perform `HMR` as I believe that this is a net negative for productivity, even for large teams.

You can pass in environment variables via the `.env` file, or inline when starting running the server. For example, `PORT=3000 deno task start`. In the server (ie Deno) you can access the environment variables with `Deno.env`, in the browser you can access them with `[window || globalThis || self].env`.

The Preact app itself has the entrypoint of `main.tsx` and makes use of `.woff2`, `.txt`, `.png`, `.json`, `.ts`, `.css`, `.module.css` (demonstrating css module support). Remote modules, relative file paths, importing into css files, and import maps are also demonstrated.

Every time the server runs, it rebuilds the source code. It adds a fairly unique `BUILD_ID` environment variable each time it builds.

### TODO
#### Assets
- decide whether I can serve static assets and easily deploy (deno deploy?)
  if I can then just use static assets
  else get all the files to output as part of the build process an serve them in-memory
- build the audio assets using the decks as the source of truth

#### Stores
- should I split up decks from session?
- I need to link the stores to localStorage

### I used
https://favicon.io/favicon-converter/
https://avatarmaker.com/