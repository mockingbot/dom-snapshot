import { resolve as resolvePath } from 'path'
import { writeFileSync, unlinkSync } from 'fs'
import { DefinePlugin } from 'webpack'

import { argvFlag, runMain } from 'dev-dep-tool/library/__utils__'
import { compileWithWebpack } from 'dev-dep-tool/library/webpack'
import { getLogger } from 'dev-dep-tool/library/logger'

const PATH_ROOT = resolvePath(__dirname, '..')
const fromRoot = (...args) => resolvePath(PATH_ROOT, ...args)

const INDEX_FILE_DATA = `
import * as Fetch from './fetch'
import * as Convert from './convert'
import * as Download from './download'
import * as FragCollector from './fragCollector'
import * as Prepare from './prepare'

export {
  createSnapshotFromElement,
  createSnapshotFromHTMLSourceList,
  renderPngDataUrlFromSvgDataUrl
} from './snapshot'

export { Fetch, Convert, Download, FragCollector, Prepare }
`

runMain(async (logger) => {
  const mode = argvFlag('development', 'production') || 'production'
  const profileOutput = argvFlag('profile') ? fromRoot('profile-stat-gitignore.json') : null
  const isWatch = argvFlag('watch')
  const isProduction = mode === 'production'

  const babelOption = {
    babelrc: false,
    cacheDirectory: isProduction,
    presets: [ [ '@babel/env', { targets: { node: 8 }, modules: false } ] ],
    plugins: [ [ '@babel/proposal-class-properties' ], [ '@babel/proposal-object-rest-spread', { useBuiltIns: true } ] ]
  }

  const config = {
    mode,
    bail: isProduction,
    output: { path: fromRoot('example'), filename: '[name].js', library: 'DomSnapshot', libraryTarget: 'umd' },
    entry: { index: 'source/index.example' },
    resolve: { alias: { source: fromRoot('source') } },
    module: { rules: [ { test: /\.js$/, use: [ { loader: 'babel-loader', options: babelOption } ] } ] },
    plugins: [ new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode), '__DEV__': !isProduction }) ]
  }

  logger.log(`generate index.example.js`)
  writeFileSync(fromRoot('source/index.example.js'), INDEX_FILE_DATA)

  logger.log(`compile with webpack mode: ${mode}, isWatch: ${Boolean(isWatch)}`)
  await compileWithWebpack({ config, isWatch, profileOutput, logger })

  logger.log(`delete index.example.js`)
  unlinkSync(fromRoot('source/index.example.js'), INDEX_FILE_DATA)
}, getLogger(`webpack`))
