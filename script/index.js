import { resolve } from 'path'
import { execSync } from 'child_process'

import { binary } from 'dr-js/module/common/format'

import { argvFlag, runMain } from 'dr-dev/module/main'
import { getLogger } from 'dr-dev/module/logger'
import { getScriptFileListFromPathList } from 'dr-dev/module/fileList'
import { initOutput, packOutput, publishOutput } from 'dr-dev/module/commonOutput'
import { processFileList, fileProcessorBabel } from 'dr-dev/module/fileProcessor'
import { getTerserOption, minifyFileListWithTerser } from 'dr-dev/module/minify'
import { writeLicenseFile } from 'dr-dev/module/license'

const PATH_ROOT = resolve(__dirname, '..')
const PATH_OUTPUT = resolve(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)
const fromOutput = (...args) => resolve(PATH_OUTPUT, ...args)
const execOptionRoot = { cwd: fromRoot(), stdio: argvFlag('quiet') ? [ 'ignore', 'ignore', 'inherit' ] : 'inherit', shell: true }

runMain(async (logger) => {
  logger.padLog('generate spec')
  execSync(`npm run script-generate-spec`, execOptionRoot)

  const packageJSON = await initOutput({ fromRoot, fromOutput, logger })
  writeLicenseFile(fromRoot('LICENSE'), packageJSON.license, 'MockingBot')

  if (!argvFlag('pack')) return

  logger.padLog(`build example`)
  execSync('npm run build-example', execOptionRoot)

  logger.padLog(`build library`)
  execSync('npm run build-library', execOptionRoot)

  logger.padLog(`build module`)
  execSync('npm run build-module', execOptionRoot)

  const fileListLibrary = await getScriptFileListFromPathList([ 'library' ], fromOutput)
  const fileListModule = await getScriptFileListFromPathList([ 'module' ], fromOutput)

  logger.padLog(`process output`)
  let sizeReduce = 0
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListLibrary, option: getTerserOption({ ecma: 5 }), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListModule, option: getTerserOption({ isReadable: true }), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await processFileList({ fileList: [ ...fileListLibrary, ...fileListModule ], processor: fileProcessorBabel, rootPath: PATH_OUTPUT, logger })
  logger.log(`size reduce: ${binary(sizeReduce)}B`)

  const pathPackagePack = await packOutput({ fromRoot, fromOutput, logger })
  await publishOutput({ flagList: process.argv, packageJSON, pathPackagePack, extraArgs: [ '--userconfig', '~/mockingbot.npmrc' ], logger })
}, getLogger(process.argv.slice(2).join('+'), argvFlag('quiet')))
