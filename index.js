const fs = require('fs');
const { resolve } = require('path');
const minimatch = require('minimatch');

let viteConfig;

module.exports = function (options = {}) {
  return {
    name: 'vite-plugin-import-css-per-file',
    apply: 'build',
    enforce: 'post',

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    writeBundle(option, bundle) {
      if (!viteConfig.build || !viteConfig.build.lib) {
        // only for lib build
        console.warn('vite-plugin-import-css-per-file only works in lib mode.');
        return;
      }
      if (option.format !== 'es') {
        // only for es built
        return;
      }
      const files = Object.keys(bundle);

      for (const file of files) {
        if (!bundle[file].isEntry) {
          // only for entry
          continue;
        }
        const cssFile = files.find((v) => v.endsWith('.css') && v.split(".")[0]===file.split(".")[0]);
        if (!cssFile) {
          continue;
        }
        if (options.include && !minimatch(file, options.include)) {
          // check if the file matches the include pattern
          continue;
        }
        if (options.exclude && minimatch(file, options.exclude)) {
          // check if the file matches the exclude pattern
          continue;
        }
        const outDir = viteConfig.build.outDir || 'dist';
        const filePath = resolve(viteConfig.root, outDir, file);
        const data = fs.readFileSync(filePath, {
          encoding: 'utf8',
        });
        fs.writeFileSync(filePath, `import './${cssFile}';\n${data}`);
      }
    },
  };
};
