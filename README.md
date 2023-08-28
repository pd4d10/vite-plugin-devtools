# vite-plugin-devtools

[![npm](https://img.shields.io/npm/v/vite-plugin-devtools.svg)](https://www.npmjs.com/package/vite-plugin-devtools)

Vite plugin to add devtools.

## Usage

```js
// vite.config.js
import devtools from "vite-plugin-devtools";

export default {
  // ...
  plugins: [
    devtools({
      // set to `true` to enable, or a function which takes env:
      // e.g. (env) => env !== 'production'
      vconsole: false,
      eruda: false,
    }),
  ],
};
```

## License

MIT
