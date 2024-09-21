
declare global {
    namespace globalThis {
        // deno-lint-ignore no-var
        var env: Record<string, unknown>;
    }
}

try {
    // @ts-ignore esbuild replaces "globalThis.ENV" with the result of Deno.env.toObject()
    globalThis['env'] = globalThis.ENV;
} catch (e) {
    console.error(e);
}