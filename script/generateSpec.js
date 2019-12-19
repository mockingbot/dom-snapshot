import { resolve } from 'path'
import { writeFileSync } from 'fs'

import { collectSourceRouteMap } from '@dr-js/dev/module/node/export/parse'
import { generateExportInfo } from '@dr-js/dev/module/node/export/generate'
import { renderMarkdownAutoAppendHeaderLink, renderMarkdownExportPath } from '@dr-js/dev/module/node/export/renderMarkdown'
import { runMain } from '@dr-js/dev/module/main'

const PATH_ROOT = resolve(__dirname, '..')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)

runMain(async (logger) => {
  logger.padLog('generate exportInfoMap')
  const sourceRouteMap = await collectSourceRouteMap({ pathRootList: [ fromRoot('source') ], logger })
  const exportInfoMap = generateExportInfo({ sourceRouteMap })

  logger.log('output: SPEC.md')
  writeFileSync(fromRoot('SPEC.md'), [
    '# Specification',
    '',
    ...renderMarkdownAutoAppendHeaderLink(
      '#### Export Path',
      ...renderMarkdownExportPath({ exportInfoMap, rootPath: PATH_ROOT })
    ),
    ''
  ].join('\n'))
}, 'generate-spec')
