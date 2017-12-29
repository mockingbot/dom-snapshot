# DOM Snapshot

[![i:npm]][l:npm]
[![i:code-style]][l:code-style]

Get `<canvas>` from DOM string through SVG `<foreignObject>`.

[Online DEMO][l:demo]

## Usage

package content:

```js
import {
  Fetch,
  Convert,
  Download,
  FragCollector,
  Prepare,
  createSnapshotFromElement,
  createSnapshotFromHTMLSourceList,
  renderPngDataUrlFromSvgDataUrl
} from 'dom-snapshot'

const {
  dataUrlToBlobUrl,
  blobToDataUrl,
  setFetchOption, // can be used to adjust fetch option
  resetFetchCache, // NOTE: should consider call this function for long running pages
  fetchTextWithCache,
  fetchBlobWithCache,
  fetchDataUrlWithCache
} = Fetch

const {
  getAbsoluteUrl,
  convertDataUrl,
  convertFragListWithUrlMap
} = Convert

const { 
  createDownloadUrl, 
  createDownloadBlob 
} = Download

const {
  prepareHTMLString,
  prepareCSSString,
  prepareSVGString,
  prepareImageElement,
  prepareCanvasElement
} = Prepare
```

[l:demo]: https://mockingbot.github.io/dom-snapshot
[i:npm]: https://img.shields.io/npm/v/dom-snapshot.svg
[l:npm]: https://www.npmjs.com/package/dom-snapshot
[i:code-style]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[l:code-style]: https://standardjs.com
