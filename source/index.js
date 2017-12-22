import { Fetch, Convert, Download } from './data'
import * as Prepare from './prepare'
import { createHTMLFragCollector } from './HTMLFragCollector'

const { prepareHTMLString, prepareCSSString, prepareSVGString, prepareImageElement, prepareCanvasElement } = Prepare

const getCanvasFromDOMFrag = async ({
  urlMap, htmlFragList,
  cssLinkHrefList, cssFragList,
  width, height
}) => {
  let htmlString
  let cssString
  let domString
  let svgString
  let imageElement
  let canvasElement

  try {
    htmlString = await prepareHTMLString(urlMap, htmlFragList)
    cssString = await prepareCSSString(cssLinkHrefList, cssFragList)
    domString = `${cssString}\n${htmlString}`
    svgString = await prepareSVGString({ domString, width, height })
    imageElement = await prepareImageElement({ svgString, width, height })
    canvasElement = await prepareCanvasElement({ imageElement, width, height })

    return {
      htmlString,
      cssString,
      domString,
      svgString,
      imageElement,
      canvasElement
    }
  } catch (error) {
    __DEV__ && console.warn('[getCanvasFromDOMFrag] error:', error, {
      htmlString,
      cssString,
      domString,
      svgString,
      imageElement,
      canvasElement
    })
    return {}
  }
}

export {
  Fetch,
  Convert,
  Download,
  Prepare,
  createHTMLFragCollector,
  getCanvasFromDOMFrag
}
