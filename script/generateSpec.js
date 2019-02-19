import { resolve } from 'path'
import { writeFileSync } from 'fs'

import { collectSourceRouteMap } from 'dr-dev/module/node/export/parse'
import { generateExportInfo } from 'dr-dev/module/node/export/generate'
import { autoAppendMarkdownHeaderLink, renderMarkdownExportPath } from 'dr-dev/module/node/export/renderMarkdown'
import { runMain } from 'dr-dev/module/main'

const PATH_ROOT = resolve(__dirname, '..')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)

runMain(async (logger) => {
  logger.log(`collect sourceRouteMap`)
  const sourceRouteMap = await collectSourceRouteMap({ pathRootList: [ fromRoot('source') ], logger })

  logger.log(`generate exportInfo`)
  const exportInfoMap = generateExportInfo({ sourceRouteMap })

  logger.log(`output: SPEC.md`)
  writeFileSync(fromRoot('SPEC.md'), [
    '# Specification',
    '',
    ...autoAppendMarkdownHeaderLink(
      '#### Export Path',
      ...renderMarkdownExportPath({ exportInfoMap, rootPath: PATH_ROOT })
    ),
    ''
  ].join('\n'))
}, 'generate-export')
