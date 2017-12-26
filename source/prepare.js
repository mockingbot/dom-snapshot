const prepareHTMLString = async (convertedFragList) => convertedFragList.join('')
  .replace(/<br>/g, '<br/>') // FIX: wrong tag
  .replace(/&nbsp;/g, ' ') // FIX: svg don't support these markup

const prepareCSSString = async (convertedFragList) => `<style>${UA_CSS_PATCH}${convertedFragList.join('')}</style>`
  .replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '') // Remove CSS comments. CHECK: https://stackoverflow.com/questions/9329552/explain-regex-that-finds-css-comments
  .replace(/#iefix&/g, '') // FIX: svg don't support this tag

const UA_CSS_PATCH = `
input[type="radio"] { -webkit-appearance: radio; -moz-appearance: radio; }
input[type="checkbox"] { -webkit-appearance: checkbox; -moz-appearance: checkbox; }
input[type="radio"], input[type="checkbox"] { box-sizing: border-box; max-width: 20px; max-height: 20px; }
input { -webkit-appearance: textfield; -moz-appearance: textfield; }
select { -webkit-appearance: menulist; -moz-appearance: menulist; }
`

const prepareSVGString = ({ domString, width, height }) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${width}" height="${height}">
  <switch>
    <foreignObject width="${width}" height="${height}">
      <body xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px">${domString}</body>
    </foreignObject>
    <text font-size="24">
      <tspan x="${width / 2}" y="${height / 2}" text-anchor="middle">Feature not supported</tspan>
    </text>
  </switch>
</svg>`

const prepareImageElement = ({ svgString, width, height }) => new Promise((resolve, reject) => {
  // const blobUrl = URL.createObjectURL(new Blob([ svgString ], { type: 'image/svg+xml' }))
  // const imageElement = document.createElement('img')
  // imageElement.crossOrigin = 'anonymous'
  // imageElement.src = blobUrl

  // TODO: HACK: instead of a blobUrl, if we use a dataUrl, chrome seems happy...
  // ISSUE: https://bugs.chromium.org/p/chromium/issues/detail?id=294129
  // FIX DEMO: https://jsfiddle.net/2Lh24rg9/
  // TODO: CHECK: dataUrl Length Limit
  // https://stackoverflow.com/questions/695151/data-protocol-url-size-limitations
  const dataUrl = `data:image/svg+xml; charset=utf8, ${encodeURIComponent(svgString)}`

  const imageElement = document.createElement('img')
  imageElement.addEventListener('error', reject)
  imageElement.addEventListener('load', () => resolve(imageElement))
  imageElement.crossOrigin = 'anonymous'
  imageElement.width = width
  imageElement.height = height
  imageElement.src = dataUrl
})

const prepareCanvasElement = ({ imageElement, width, height }) => new Promise((resolve) => {
  const canvasElement = document.createElement('canvas')
  canvasElement.width = width
  canvasElement.height = height
  setTimeout(() => { // TODO: HACK: if direct return, Chrome in Linux will crash (but not Firefox)
    canvasElement.getContext('2d').drawImage(imageElement, 0, 0)
    resolve(canvasElement)
  }, 0)
})

export {
  prepareHTMLString,
  prepareCSSString,
  prepareSVGString,
  prepareImageElement,
  prepareCanvasElement
}
