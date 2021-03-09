import { resolve } from 'path'
import { execSync } from 'child_process'

import { getSourceJsFileListFromPathList } from '@dr-js/dev/module/node/filePreset'
import { initOutput, packOutput, verifyNoGitignore, verifyGitStatusClean, publishOutput } from '@dr-js/dev/module/output'
import { getTerserOption, minifyFileListWithTerser } from '@dr-js/dev/module/minify'
import { processFileList, fileProcessorBabel } from '@dr-js/dev/module/fileProcessor'
import { runMain, argvFlag } from '@dr-js/dev/module/main'

const PATH_ROOT = resolve(__dirname, '..')
const PATH_OUTPUT = resolve(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)
const fromOutput = (...args) => resolve(PATH_OUTPUT, ...args)
const execShell = (command) => execSync(command, { cwd: fromRoot(), stdio: argvFlag('quiet') ? [ 'ignore', 'ignore', 'inherit' ] : 'inherit' })

const buildOutput = async ({ logger }) => {
  logger.padLog('generate spec')
  execShell('npm run script-generate-spec')
  logger.padLog('build example')
  execShell('npm run build-example')
  logger.padLog('build library')
  execShell('npm run build-library')
  logger.padLog('build module')
  execShell('npm run build-module')
}

const processOutput = async ({ logger }) => {
  const fileListLibrary = await getSourceJsFileListFromPathList([ 'library' ], fromOutput)
  const fileListModule = await getSourceJsFileListFromPathList([ 'module' ], fromOutput)
  let sizeReduce = 0
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListLibrary, option: getTerserOption(), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await minifyFileListWithTerser({ fileList: fileListModule, option: getTerserOption({ isReadable: true }), rootPath: PATH_OUTPUT, logger })
  sizeReduce += await processFileList({ fileList: [ ...fileListLibrary, ...fileListModule ], processor: fileProcessorBabel, rootPath: PATH_OUTPUT, logger })
  logger.log(`size reduce: ${sizeReduce}B`)
}

runMain(async (logger) => {
  await verifyNoGitignore({ path: fromRoot('source'), logger })
  const packageJSON = await initOutput({ fromRoot, fromOutput, logger })
  if (!argvFlag('pack')) return
  await buildOutput({ logger })
  await processOutput({ logger })
  const isTest = argvFlag('test', 'publish-auto')
  isTest && logger.padLog('lint source')
  isTest && execShell('npm run lint')
  isTest && await processOutput({ logger }) // once more
  // TODO: no test for now
  isTest && await verifyGitStatusClean({ fromRoot, logger })
  const pathPackagePack = await packOutput({ fromRoot, fromOutput, logger })
  await publishOutput({ packageJSON, pathPackagePack, extraArgs: [ '--userconfig', '~/mockingbot.npmrc' ], logger })
})
