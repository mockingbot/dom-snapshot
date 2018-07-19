import { resolve } from 'path'
import { execSync } from 'child_process'

import { binary as formatBinary } from 'dr-js/library/common/format'
import { getFileList } from 'dr-js/library/node/file/Directory'

import { argvFlag, runMain } from 'dev-dep-tool/library/__utils__'
import { getLogger } from 'dev-dep-tool/library/logger'
import { wrapFileProcessor, fileProcessorBabel } from 'dev-dep-tool/library/fileProcessor'
import { initOutput, packOutput, publishOutput } from 'dev-dep-tool/library/commonOutput'
import { getUglifyESOption, minifyFileListWithUglifyEs } from 'dev-dep-tool/library/uglify'

const PATH_ROOT = resolve(__dirname, '..')
const PATH_OUTPUT = resolve(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)
const fromOutput = (...args) => resolve(PATH_OUTPUT, ...args)
const execOptionRoot = { cwd: fromRoot(), stdio: argvFlag('quiet') ? [ 'ignore', 'ignore', 'inherit' ] : 'inherit', shell: true }

runMain(async (logger) => {
  logger.padLog('generate spec')
  execSync(`npm run script-generate-spec`, execOptionRoot)

  const packageJSON = await initOutput({ fromRoot, fromOutput, logger })
  if (!argvFlag('pack')) return

  logger.padLog(`build example`)
  execSync('npm run build-example', execOptionRoot)

  logger.padLog(`build library`)
  execSync('npm run build-library', execOptionRoot)

  logger.padLog(`build module`)
  execSync('npm run build-module', execOptionRoot)

  logger.padLog(`minify library`)
  await minifyFileListWithUglifyEs({
    fileList: (await getFileList(fromOutput('library'))).filter((path) => path.endsWith('.js') && !path.endsWith('.test.js')),
    option: getUglifyESOption({ isDevelopment: false, isModule: false }),
    rootPath: PATH_OUTPUT,
    logger
  })

  logger.padLog(`minify module`)
  await minifyFileListWithUglifyEs({
    fileList: (await getFileList(fromOutput('library'))).filter((path) => path.endsWith('.js') && !path.endsWith('.test.js')),
    option: getUglifyESOption({ isDevelopment: false, isModule: true }),
    rootPath: PATH_OUTPUT,
    logger
  })

  logger.padLog(`process library`)
  const processBabel = wrapFileProcessor({ processor: fileProcessorBabel, logger })
  let sizeCodeReduceLibrary = 0
  for (const filePath of await getFileList(fromOutput('library'))) sizeCodeReduceLibrary += await processBabel(filePath)
  logger.log(`library size reduce: ${formatBinary(sizeCodeReduceLibrary)}B`)

  logger.padLog(`process module`)
  let sizeCodeReduceModule = 0
  for (const filePath of await getFileList(fromOutput('module'))) sizeCodeReduceModule += await processBabel(filePath)
  logger.log(`module size reduce: ${formatBinary(sizeCodeReduceModule)}B`)

  const pathPackagePack = await packOutput({ fromRoot, fromOutput, logger })
  await publishOutput({ flagList: process.argv, packageJSON, pathPackagePack, extraArgs: [ '--userconfig', '~/mockingbot.npmrc' ], logger })
}, getLogger(process.argv.slice(2).join('+'), argvFlag('quiet')))
