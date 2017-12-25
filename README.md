# DOM Snapshot

[![i:npm:dom-snapshot]][l:npm:dom-snapshot]
[![i:code-style:standard-js]][l:code-style:standard-js]

Get `<canvas>` from DOM string through SVG `<foreignObject>`.

## Usage

package content:

```js
import {
  Fetch,
  Convert,
  Download,
  Prepare,
  createHTMLFragCollector,
  createSnapshotFromHTMLSourceList,
  createSnapshotFromElement
} from 'dom-snapshot'

const {
  dataUrlToBlobUrl,
  blobToDataUrl,
  resetFetchCache, // NOTE: should consider call this function for long running pages
  fetchTextWithCache,
  fetchBlobWithCache,
  fetchDataUrlWithCache
} = Fetch

const { 
  convertDataUrl, 
  inlineCSSFont 
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

[i:npm:dom-snapshot]: https://img.shields.io/npm/v/dom-snapshot.svg
[l:npm:dom-snapshot]: https://www.npmjs.com/package/dom-snapshot
[i:code-style:standard-js]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[l:code-style:standard-js]: https://standardjs.com
