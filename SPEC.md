# Specification

* [Export Path](#export-path)

#### Export Path
+ 📄 [source/convert.js](source/convert.js)
  - `convertDataUrl`, `convertFragListWithUrlMap`, `getAbsoluteUrl`
+ 📄 [source/fetch.js](source/fetch.js)
  - `blobToDataUrl`, `dataUrlToBlobUrl`, `fetchBlobWithCache`, `fetchDataUrlWithCache`, `fetchTextWithCache`, `resetFetchCache`, `setFetchOption`
+ 📄 [source/fragCollector.js](source/fragCollector.js)
  - `createCSSFragCollector`, `createFragCollector`, `createHTMLFragCollector`, `createUrlExtractor`
+ 📄 [source/prepare.js](source/prepare.js)
  - `prepareCSSString`, `prepareCanvasElement`, `prepareHTMLString`, `prepareImageElement`, `prepareSVGString`
+ 📄 [source/snapshot.js](source/snapshot.js)
  - `createSnapshotFromElement`, `createSnapshotFromHTMLSourceList`, `renderPngDataUrlFromSvgDataUrl`