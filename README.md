[![publish npm](https://github.com/majidh1/vite-plugin-import-css-per-file/actions/workflows/publish_npm.yaml/badge.svg)](https://github.com/majidh1/vite-plugin-import-css-per-file/actions/workflows/publish_npm.yaml)

# vite-plugin-import-css-per-file
This plugin will inject css into bundled js file using `import` statement per file like this:

```js
// bundled first.js js file, with import css at top (if any)
import './first.css';
// rest of the file
// ...
// bundled second.js js file, with import css at top (if any)
import './second.css';
// rest of the file
// ...
```

Install:

```
npm i vite-plugin-import-css-per-file -D
```

Usage:

```js
// vite.config.js
import importCssPerFile from 'vite-plugin-import-css-per-file';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // any other plugins
    importCssPerFile()
  ],
});
```

or with include/exclude options 

```js
// vite.config.js
import importCssPerFile from 'vite-plugin-import-css-per-file';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // any other plugins
    importCssPerFile({
      include: 'src/**/*', // Include all entry files
      exclude: 'src/utils/*', // Exclude entry files in the "utils" directory
    })
  ],
});
```

Note that this plugin will only work with [library-mode](https://vitejs.dev/guide/build.html#library-mode) and es format build.
