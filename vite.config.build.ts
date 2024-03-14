import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { PluginOption, build } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import Case from 'case'
import autoprefixer from 'autoprefixer'
import { transform } from 'esbuild'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = resolve(__dirname, './')
const libraryName = 'vue-easy-lightbox'
const entry = resolve(__dirname, './src/index.ts')
const umdEntry = resolve(__dirname, './src/index.umd.ts')
const formatNameMap = {
  cjs: 'commonjs',
  es: 'esm',
  umd: 'umd'
}

// minify lib mode 'es' output
// https://github.com/vitejs/vite/issues/6555
function minifyEs(): PluginOption {
  return {
    name: 'minifyEs',
    renderChunk: {
      order: 'post',
      async handler(code, chunk, outputOptions) {
        if (
          outputOptions.format === 'es' &&
          chunk.fileName.endsWith('.min.js')
        ) {
          return await transform(code, { minify: true })
        }
        return code
      }
    }
  }
}

const runBuild = async (isUmd = false, isExternal = false) => {
  await build({
    root,
    css: {
      postcss: {
        plugins: [autoprefixer]
      }
    },
    build: {
      emptyOutDir: false,
      outDir: resolve(root, isExternal ? 'dist/external-css' : 'dist'),
      lib: {
        entry: isUmd ? umdEntry : entry,
        name: Case.pascal(libraryName),
        formats: isUmd ? ['umd'] : ['cjs', 'es'],
        fileName: (format) => {
          return `vue-easy-lightbox.${formatNameMap[format]}.test.min.js`
        }
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          exports: isUmd ? 'default' : 'named',
          globals: {
            vue: 'Vue'
          },
          assetFileNames() {
            // https://github.com/vitejs/vite/issues/4863#issuecomment-1590747360
            return `${libraryName}.[ext]`
          }
        }
      }
    },
    plugins: [
      (() => (isExternal ? null : cssInjectedByJsPlugin()))(),
      minifyEs()
    ]
  })
}

;(async () => {
  // inject
  await runBuild(false, false) // esm, cjs
  await runBuild(true, false) // umd

  // external css file
  await runBuild(false, true) // esm, cjs
  await runBuild(true, true) // umd

  console.log('Done!')
})()
