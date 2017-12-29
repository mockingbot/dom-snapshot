import * as Fetch from './fetch'
import * as Convert from './convert'
import * as Download from './download'
import * as FragCollector from './fragCollector'
import * as Prepare from './prepare'

const {
  prepareHTMLString,
  prepareCSSString,
  prepareSVGString,
  prepareImageElement,
  prepareCanvasElement,
  prepareWithWorkerFrame
} = Prepare

const createSnapshotFromElement = async ({ element, width, height, useFrameWorker = false }) => {
  if (!element) throw new Error(`[createSnapshotFromElement] invalid element: ${element}`)

  width = parseInt(width || (element.style.width.endsWith('px') && element.style.width) || element.offsetWidth)
  height = parseInt(height || (element.style.height.endsWith('px') && element.style.height) || element.offsetHeight)
  if (!width || !height) throw new Error(`[createSnapshotFromElement] can not get output size: width: ${width}, height: ${height}`)

  const htmlSourceList = new window.XMLSerializer().serializeToString(element).split('\n')
  __DEV__ && console.log('[createSnapshotFromElement]', { element, htmlSourceList, width, height })

  return createSnapshotFromHTMLSourceList({ htmlSourceList, width, height, useFrameWorker })
}

const createSnapshotFromHTMLSourceList = async ({ htmlSourceList, width, height, useFrameWorker = false }) => {
  if (!Array.isArray(htmlSourceList)) throw new Error(`[createSnapshotFromHTMLSourceList] invalid htmlSourceList: ${htmlSourceList}`)
  if (!width || !height) throw new Error(`[createSnapshotFromHTMLSourceList] invalid size: width: ${width}, height: ${height}`)

  const htmlFragCollector = FragCollector.createHTMLFragCollector()
  htmlSourceList.forEach((fragString) => htmlFragCollector.collect(fragString, ''))

  const cssFragCollector = FragCollector.createCSSFragCollector()
  const cssUrlList = Array.from(document.getElementsByTagName('link'))
    .map((element) => (element.rel === 'stylesheet' && element.href))
    .filter((href) => href)
  for (const cssUrl of cssUrlList) {
    cssFragCollector.collect(await Fetch.fetchTextWithCache(cssUrl), cssUrl) // with originUrl
  }
  Array.from(document.getElementsByTagName('style'))
    .map((element) => cssFragCollector.collect(element.innerHTML, ''))

  let htmlString, cssString, domString, svgString, svgDataUrl, pngDataUrl, imageElement, canvasElement
  const packResult = () => ({ htmlString, cssString, domString, svgString, svgDataUrl, pngDataUrl, imageElement, canvasElement })
  try {
    htmlString = await prepareHTMLString(await Convert.convertFragListWithUrlMap(htmlFragCollector.getOutput()))
    cssString = await prepareCSSString(await Convert.convertFragListWithUrlMap(cssFragCollector.getOutput()))
    domString = `${cssString}\n${htmlString}`
    svgString = await prepareSVGString({ domString, width, height })

    // TODO: HACK: instead of a blobUrl, if we use a dataUrl, chrome seems happy...
    // ISSUE: https://bugs.chromium.org/p/chromium/issues/detail?id=294129
    // FIX DEMO: https://jsfiddle.net/2Lh24rg9/
    // TODO: CHECK: dataUrl Length Limit
    // https://stackoverflow.com/questions/695151/data-protocol-url-size-limitations
    // const blobUrl = URL.createObjectURL(new Blob([ svgString ], { type: 'image/svg+xml' }))
    svgDataUrl = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgString)}`

    if (useFrameWorker) {
      pngDataUrl = await prepareWithWorkerFrame({ svgDataUrl, width, height })
    } else {
      imageElement = await prepareImageElement({ svgDataUrl, width, height })
      canvasElement = await prepareCanvasElement({ imageElement, width, height })
    }
  } catch (error) { __DEV__ && console.warn('[createSnapshotFromHTMLSourceList] error:', error, packResult()) }
  return packResult()
}

export {
  Fetch,
  Convert,
  Download,
  FragCollector,
  Prepare,
  createSnapshotFromElement,
  createSnapshotFromHTMLSourceList
}
