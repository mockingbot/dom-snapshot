import { Fetch, Convert, Download } from './data'
import * as Prepare from './prepare'
import { createHTMLFragCollector } from './HTMLFragCollector'

const { prepareHTMLString, prepareCSSString, prepareSVGString, prepareImageElement, prepareCanvasElement } = Prepare

const createSnapshotFromHTMLSourceList = async ({ htmlSourceList, width, height }) => {
  const { getOutput, collect } = createHTMLFragCollector()
  htmlSourceList.forEach(collect)
  const { htmlFragList, urlMap } = getOutput()
  __DEV__ && console.log('[generate]', { htmlFragList, urlMap })

  const cssLinkHrefList = Array.from(document.getElementsByTagName('link'))
    .map((element) => (element.rel === 'stylesheet' && element.href))
    .filter((href) => href)
  const cssFragList = Array.from(document.getElementsByTagName('style'))
    .map((element) => element.innerHTML)

  let htmlString, cssString, domString, svgString, imageElement, canvasElement
  try {
    htmlString = await prepareHTMLString(urlMap, htmlFragList)
    cssString = await prepareCSSString(cssLinkHrefList, cssFragList)
    domString = `${cssString}\n${htmlString}`
    svgString = await prepareSVGString({ domString, width, height })
    imageElement = await prepareImageElement({ svgString, width, height })
    canvasElement = await prepareCanvasElement({ imageElement, width, height })
    return { htmlString, cssString, domString, svgString, imageElement, canvasElement }
  } catch (error) {
    __DEV__ && console.warn('[createSnapshotFromHTMLSourceList] error:', error, { htmlString, cssString, domString, svgString, imageElement, canvasElement })
    return {}
  }
}

const createSnapshotFromElement = async (element) => {
  const htmlSourceList = new window.XMLSerializer().serializeToString(element).split('\n')
  const { offsetWidth: width, offsetHeight: height } = element
  console.log('[createSnapshotFromElement]', { htmlSourceList, width, height })
  return createSnapshotFromHTMLSourceList({ htmlSourceList, width, height })
}

export {
  Fetch,
  Convert,
  Download,
  Prepare,
  createHTMLFragCollector,
  createSnapshotFromHTMLSourceList,
  createSnapshotFromElement
}
