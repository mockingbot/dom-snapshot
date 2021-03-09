import { resolve } from 'path'
import { writeFileSync, unlinkSync } from 'fs'

import { compileWithWebpack, commonFlag } from '@dr-js/dev/module/webpack'
import { runMain } from '@dr-js/dev/module/main'

const PATH_ROOT = resolve(__dirname, '..')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)

const PATH_EXAMPLE = resolve(PATH_ROOT, './example')

const INDEX_FILE = 'source/index.example.js'
const INDEX_FILE_DATA = `
import * as Time from '@dr-js/core/module/common/time'
import * as Format from '@dr-js/core/module/common/format'
import * as Resource from '@dr-js/core/module/browser/resource'

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
  const { mode, isWatch, profileOutput, getCommonWebpackConfig } = await commonFlag({ fromRoot, logger })

  logger.log(`generate ${INDEX_FILE}`)
  writeFileSync(fromRoot(INDEX_FILE), INDEX_FILE_DATA)
  process.on('exit', () => { // TODO: not working in watch mode (win32)
    logger.log(`delete ${INDEX_FILE}`)
    try { unlinkSync(fromRoot(INDEX_FILE)) } catch (error) { __DEV__ && console.log(error) }
  })

  const config = getCommonWebpackConfig(({
    output: { path: PATH_EXAMPLE, filename: '[name].js', library: 'DomSnapshot', libraryTarget: 'umd' },
    entry: { index: INDEX_FILE }
  }))

  logger.padLog(`compile with webpack mode: ${mode}, isWatch: ${Boolean(isWatch)}`)
  await compileWithWebpack({ config, isWatch, profileOutput, logger })
}, 'webpack-example')
