import { resolve } from 'path'
import { writeFileSync } from 'fs'

import { collectSourceJsRouteMap } from '@dr-js/dev/module/node/export/parsePreset'
import { generateExportInfo } from '@dr-js/dev/module/node/export/generate'
import { /* getMarkdownFileLink, renderMarkdownBlockQuote, */ renderMarkdownAutoAppendHeaderLink, renderMarkdownExportPath } from '@dr-js/dev/module/node/export/renderMarkdown'
import { runMain } from '@dr-js/dev/module/main'

// import { formatUsage } from 'source-bin/option'

const PATH_ROOT = resolve(__dirname, '..')
const fromRoot = (...args) => resolve(PATH_ROOT, ...args)

runMain(async (logger) => {
  logger.padLog('generate exportInfoMap')
  const sourceRouteMap = await collectSourceJsRouteMap({ pathRootList: [ fromRoot('source') ], logger })
  const exportInfoMap = generateExportInfo({ sourceRouteMap })

  logger.padLog('output: SPEC.md')
  writeFileSync(fromRoot('SPEC.md'), [
    '# Specification',
    '',
    ...renderMarkdownAutoAppendHeaderLink(
      '#### Export Path',
      ...renderMarkdownExportPath({ exportInfoMap, rootPath: PATH_ROOT })
      // '',
      // '#### Bin Option Format',
      // getMarkdownFileLink('source-bin/option.js'),
      // ...renderMarkdownBlockQuote(formatUsage())
    ),
    ''
  ].join('\n'))
}, 'generate-spec')
