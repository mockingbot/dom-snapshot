# DOM Snapshot

[![i:npm:dom-snapshot]][l:npm:dom-snapshot]
[![i:code-style:standard-js]][l:code-style:standard-js]

Get `<canvas>` from DOM string through SVG `<foreignObject>`.

[Online DEMO][l:demo:dom-snapshot]

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
  createSnapshotFromHTMLSourceList
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
  prepareCanvasElement,
  prepareWithWorkerFrame
} = Prepare
```

[l:demo:dom-snapshot]: https://mockingbot.github.io/dom-snapshot
[i:npm:dom-snapshot]: https://img.shields.io/npm/v/dom-snapshot.svg
[l:npm:dom-snapshot]: https://www.npmjs.com/package/dom-snapshot
[i:code-style:standard-js]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[l:code-style:standard-js]: https://standardjs.com
