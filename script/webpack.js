import { resolve as resolvePath } from 'path'
import { writeFileSync, unlinkSync } from 'fs'
import { DefinePlugin } from 'webpack'

import { addExitListenerSync } from 'dr-js/module/node/system/ExitListener'

import { argvFlag, runMain } from 'dev-dep-tool/library/main'
import { getLogger } from 'dev-dep-tool/library/logger'
import { compileWithWebpack, commonFlag } from 'dev-dep-tool/library/webpack'

const PATH_ROOT = resolvePath(__dirname, '..')
const fromRoot = (...args) => resolvePath(PATH_ROOT, ...args)

const INDEX_FILE = 'source/index.example.js'
const INDEX_FILE_DATA = `
import * as Time from 'dr-js/module/common/time'
import * as Format from 'dr-js/module/common/format'
import * as Resource from 'dr-js/module/browser/resource'

import * as Fetch from './fetch'
import * as Convert from './convert'
import * as FragCollector from './fragCollector'
import * as Prepare from './prepare'

export {
  createSnapshotFromElement,
  createSnapshotFromHTMLSourceList,
  renderPngDataUrlFromSvgDataUrl
} from './snapshot'

export {
  Fetch, Convert, FragCollector, Prepare,
  Format, Time, Resource
}
`

runMain(async (logger) => {
  const { mode, isWatch, isProduction, profileOutput, assetMapOutput } = await commonFlag({ argvFlag, fromRoot, logger })

  const babelOption = {
    configFile: false,
    babelrc: false,
    cacheDirectory: isProduction,
    presets: [ [ '@babel/env', { targets: { node: '8.8' }, modules: false } ] ],
    plugins: [
      isProduction && [ '@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true } ]
    ].filter(Boolean)
  }

  const config = {
    mode,
    bail: isProduction,
    output: { path: fromRoot('example'), filename: '[name].js', library: 'DomSnapshot', libraryTarget: 'umd' },
    entry: { index: INDEX_FILE },
    resolve: { alias: { source: fromRoot('source') } },
    module: { rules: [ { test: /\.js$/, use: [ { loader: 'babel-loader', options: babelOption } ] } ] },
    plugins: [ new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode), '__DEV__': !isProduction }) ]
  }

  logger.log(`generate ${INDEX_FILE}`)
  writeFileSync(fromRoot(INDEX_FILE), INDEX_FILE_DATA)

  logger.log(`compile with webpack mode: ${mode}, isWatch: ${Boolean(isWatch)}`)
  await compileWithWebpack({ config, isWatch, profileOutput, assetMapOutput, logger })

  addExitListenerSync(() => {
    logger.log(`delete ${INDEX_FILE}`)
    unlinkSync(fromRoot(INDEX_FILE), INDEX_FILE_DATA)
  })
}, getLogger(`webpack`))
