import { resolve } from 'path'
import { writeFileSync } from 'fs'

import { getDirectoryContent, walkDirectoryContent } from 'dr-js/library/node/file/Directory'

import { runMain } from 'dev-dep-tool/library/__utils__'
import { getLogger } from 'dev-dep-tool/library/logger'
import { createExportParser } from 'dev-dep-tool/library/ExportIndex/parseExport'
import { generateExportInfo } from 'dev-dep-tool/library/ExportIndex/generateInfo'
import { renderMarkdownExportPath } from 'dev-dep-tool/library/ExportIndex/renderMarkdown'

const PATH_ROOT = resolve(__dirname, '..')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)

const collectSourceRouteMap = async ({ logger }) => {
  const { parseExport, getSourceRouteMap } = createExportParser({ logger })
  const parseWalkExport = (path, name) => parseExport(resolve(path, name))
  await walkDirectoryContent(await getDirectoryContent(fromRoot('source')), parseWalkExport)
  return getSourceRouteMap()
}

runMain(async (logger) => {
  logger.log(`collect sourceRouteMap`)
  const sourceRouteMap = await collectSourceRouteMap({ logger })

  logger.log(`generate exportInfo`)
  const exportInfoMap = generateExportInfo({ sourceRouteMap })

  logger.log(`output: EXPORT_INFO.md`)
  writeFileSync(fromRoot('EXPORT_INFO.md'), [
    '# Export Info',
    '',
    '#### Export Path',
    ...renderMarkdownExportPath({ exportInfoMap, rootPath: PATH_ROOT })
  ].join('\n'))
}, getLogger('generate-export'))
