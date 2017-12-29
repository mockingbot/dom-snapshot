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

const prepareImageElement = ({ svgDataUrl, width, height }) => new Promise((resolve, reject) => {
  const imageElement = document.createElement('img')
  imageElement.addEventListener('error', reject)
  imageElement.addEventListener('load', () => resolve(imageElement))
  imageElement.crossOrigin = 'anonymous'
  imageElement.width = width
  imageElement.height = height
  imageElement.src = svgDataUrl
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

let WORKER_FRAME
const prepareWithWorkerFrame = async ({ svgDataUrl, width, height }) => {
  if (WORKER_FRAME === undefined) WORKER_FRAME = await createWorkerFrame()
  let messageListener
  return new Promise((resolve, reject) => {
    messageListener = (event) => {
      let action
      try {
        action = JSON.parse(event.data)
        if (action.type !== 'response:prepare') return
      } catch (error) {
        __DEV__ && console.warn(error)
        return
      }
      __DEV__ && console.log('[WORKER_FRAME] get action:', action)
      try {
        const { errorMessage, pngDataUrl } = action.payload
        if (errorMessage) return reject(new Error(errorMessage))
        return resolve(pngDataUrl)
      } catch (error) { reject(error) }
    }
    window.addEventListener('message', messageListener)
    WORKER_FRAME.contentWindow.postMessage(JSON.stringify({ type: 'request:prepare', payload: { svgDataUrl, width, height } }), '*')
  }).then((pngDataUrl) => {
    window.removeEventListener('message', messageListener)
    return pngDataUrl
  }, (error) => {
    window.removeEventListener('message', messageListener)
    throw error
  })
}

const FRAME_SOURCE = `<!DOCTYPE html>
<script>
const prepareImageElement = ({ svgDataUrl, width, height }) => new Promise((resolve, reject) => {
  const imageElement = document.createElement('img')
  imageElement.addEventListener('error', reject)
  imageElement.addEventListener('load', () => resolve(imageElement))
  imageElement.crossOrigin = 'anonymous'
  imageElement.width = width
  imageElement.height = height
  imageElement.src = svgDataUrl
})
const prepareCanvasElement = ({ imageElement, width, height }) => new Promise((resolve) => {
  const canvasElement = document.createElement('canvas')
  canvasElement.width = width
  canvasElement.height = height
  setTimeout(() => { // TODO: HACK
    canvasElement.getContext('2d').drawImage(imageElement, 0, 0)
    resolve(canvasElement)
  }, 0)
})
const parseRequest = ({ event }) => { try { return JSON.parse(event.data) } catch (error) { return {} } }
const respond = ({ event, type, payload }) => { event.source.postMessage(JSON.stringify({ type, payload }), event.origin) }
window.onmessage = async (event) => {
  const { type, payload } = parseRequest({ event })
  if (type !== 'request:prepare') return
  try {
    const { svgDataUrl, width, height } = payload
    const imageElement = await prepareImageElement({ svgDataUrl, width, height })
    const canvasElement = await prepareCanvasElement ({ imageElement, width, height })
    const pngDataUrl = canvasElement.toDataURL()
    respond({ event, type: 'response:prepare',payload: { pngDataUrl } })
  } catch (error) {
    respond({ event, type: 'response:prepare',payload: { errorMessage: error.toString() } })
  }
}
</script>`

const createWorkerFrame = () => new Promise((resolve, reject) => {
  const workerFrame = document.createElement('iframe')
  workerFrame.onerror = reject
  workerFrame.onload = () => resolve(workerFrame)
  workerFrame.src = `data:text/html;charset=utf-8,${encodeURIComponent(FRAME_SOURCE)}`
  workerFrame.style.display = 'none'
  document.body.appendChild(workerFrame)
})

export {
  prepareHTMLString,
  prepareCSSString,
  prepareSVGString,
  prepareImageElement,
  prepareCanvasElement,
  prepareWithWorkerFrame
}
