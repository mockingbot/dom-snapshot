import { fetchTextWithCache } from './fetch'
import { convertFragListWithUrlMap } from './convert'
import { createHTMLFragCollector, createCSSFragCollector } from './fragCollector'
import {
  prepareHTMLString,
  prepareCSSString,
  prepareSVGString,
  prepareImageElement,
  prepareCanvasElement
} from './prepare'

const createSnapshotFromElement = async ({ element, width, height, skipHeavyRender = false }) => {
  if (!element) throw new Error(`invalid element: ${element}`)

  width = parseInt(width || (element.style.width.endsWith('px') && element.style.width) || element.offsetWidth)
  height = parseInt(height || (element.style.height.endsWith('px') && element.style.height) || element.offsetHeight)
  if (!width || !height) throw new Error(`can not get output size: width: ${width}, height: ${height}`)

  const htmlSourceList = new window.XMLSerializer().serializeToString(element).split('\n')
  __DEV__ && console.log('[createSnapshotFromElement]', { element, htmlSourceList, width, height })

  return createSnapshotFromHTMLSourceList({ htmlSourceList, width, height, skipHeavyRender })
}

const createSnapshotFromHTMLSourceList = async ({ htmlSourceList, width, height, skipHeavyRender = false }) => {
  if (!Array.isArray(htmlSourceList)) throw new Error(`invalid htmlSourceList: ${htmlSourceList}`)
  if (!width || !height) throw new Error(`invalid size: width: ${width}, height: ${height}`)

  const htmlFragCollector = createHTMLFragCollector()
  htmlSourceList.forEach((fragString) => htmlFragCollector.collect(fragString, ''))

  const cssFragCollector = createCSSFragCollector()
  const cssUrlList = Array.from(document.getElementsByTagName('link'))
    .map((element) => (element.rel === 'stylesheet' && element.href))
    .filter((href) => href)
  for (const cssUrl of cssUrlList) {
    cssFragCollector.collect(await fetchTextWithCache(cssUrl), cssUrl) // with originUrl
  }
  Array.from(document.getElementsByTagName('style'))
    .map((element) => cssFragCollector.collect(element.innerHTML, ''))

  const htmlFragOutput = htmlFragCollector.getOutput()
  const cssFragOutput = cssFragCollector.getOutput()

  { // reduce unused font files
    const fontFamilySet = new Set([
      ...htmlFragOutput.fontInfo.fontFamilySet,
      ...cssFragOutput.fontInfo.fontFamilySet
    ])

    Object.entries({
      ...htmlFragOutput.fontInfo.fontFaceMap,
      ...cssFragOutput.fontInfo.fontFaceMap
    }).forEach(([ fontTag, urlInfoSet ]) => {
      __DEV__ && !fontFamilySet.has(fontTag.split('|')[ 0 ]) && console.log('[DROP] font tag:', fontTag, urlInfoSet)
      if (!fontFamilySet.has(fontTag.split('|')[ 0 ])) return urlInfoSet.forEach((urlInfo) => { urlInfo.isIgnore = true })

      // reduce font files
      // TODO: may break compatibility (do we have many?) // NOTE: prefer keep by: woff2, woff, or just the first one (ttf/otf maybe)
      let urlInfoWoff2 = null
      let urlInfoWoff = null
      urlInfoSet.forEach((urlInfo) => {
        urlInfoWoff2 = urlInfoWoff2 || (urlInfo.urlString.includes('woff2') ? urlInfo : null)
        urlInfoWoff = urlInfoWoff || (urlInfo.urlString.includes('woff') ? urlInfo : null)
      })

      // drop others
      let hasPickedFirst = false
      urlInfoSet.forEach((urlInfo) => {
        if (urlInfoWoff2 && urlInfo !== urlInfoWoff2) urlInfo.isIgnore = true
        else if (urlInfoWoff && urlInfo !== urlInfoWoff) urlInfo.isIgnore = true
        else {
          urlInfo.isIgnore = hasPickedFirst
          hasPickedFirst = true
        }
        __DEV__ && urlInfo.isIgnore && console.log('[DROP] font src:', urlInfo)
      })
    })
  }

  __DEV__ && console.warn('[createSnapshotFromHTMLSourceList]', { htmlFragOutput, cssFragOutput })

  let htmlString, cssString, domString, svgString, svgDataUrl, imageElement, canvasElement, pngDataUrl
  const packResult = () => ({ htmlString, cssString, domString, svgString, svgDataUrl, imageElement, canvasElement, pngDataUrl })
  try {
    htmlString = await prepareHTMLString(await convertFragListWithUrlMap(htmlFragOutput))
    cssString = await prepareCSSString(await convertFragListWithUrlMap(cssFragOutput))
    domString = `${cssString}\n${htmlString}`
    svgString = await prepareSVGString({ domString, width, height })

    // TODO: HACK: instead of a blobUrl, if we use a dataUrl, chrome seems happy...
    // ISSUE: https://bugs.chromium.org/p/chromium/issues/detail?id=294129
    // FIX DEMO: https://jsfiddle.net/2Lh24rg9/
    // TODO: CHECK: dataUrl Length Limit
    // https://stackoverflow.com/questions/695151/data-protocol-url-size-limitations
    // const blobUrl = URL.createObjectURL(new Blob([ svgString ], { type: 'image/svg+xml' }))
    svgDataUrl = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgString)}`

    if (!skipHeavyRender) {
      const result = await renderPngDataUrlFromSvgDataUrl({ svgDataUrl, width, height })
      imageElement = result.imageElement
      canvasElement = result.canvasElement
      pngDataUrl = result.pngDataUrl
    }
  } catch (error) { __DEV__ && console.warn('[createSnapshotFromHTMLSourceList] error:', error, packResult()) }
  return packResult()
}

const renderPngDataUrlFromSvgDataUrl = async ({ svgDataUrl, width, height }) => {
  const imageElement = await prepareImageElement({ svgDataUrl, width, height })
  const canvasElement = await prepareCanvasElement({ imageElement, width, height })
  const pngDataUrl = canvasElement.toDataURL()
  return { imageElement, canvasElement, pngDataUrl }
}

export {
  createSnapshotFromElement,
  createSnapshotFromHTMLSourceList,
  renderPngDataUrlFromSvgDataUrl
}
