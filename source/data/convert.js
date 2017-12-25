import { fetchDataUrlWithCache } from './fetch'

const convertDataUrl = (url) => {
  if (url.startsWith('data:')) return url // already a dataUrl
  if (url.startsWith('blob:')) return fetchDataUrlWithCache(url) // already a blobUrl

  const regexResult = REGEXP_IMAGE_EXTENSION.exec(url)
  const imageMIME = regexResult && IMAGE_MIME_MAP[ regexResult[ 1 ].toLowerCase() ]
  if (imageMIME) {
    __DEV__ && console.log('get imageMIME:', { url, imageMIME })
    return fetchDataUrlWithCache(url)
  }

  return ''
}
const REGEXP_IMAGE_EXTENSION = /\.([0-9a-z]{3,4})(?:[?#]|$)/i // check http://stackoverflow.com/questions/6582171/javascript-regex-for-matching-extracting-file-extension
const IMAGE_MIME_MAP = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  bmp: 'image/bmp',
  ico: 'image/x-icon'
}

const inlineCSSFont = async (cssString, originUrl) => {
  const fragList = []
  let stringIndex = 0
  let execResult
  while ((execResult = REGEXP_FONT_URL.exec(cssString))) {
    let fontSrc = getAbsoluteUrl(execResult[ 0 ], originUrl)
    fragList.push(cssString.slice(stringIndex, execResult.index))
    fragList.push(await fetchDataUrlWithCache(fontSrc)) // to be replaced
    stringIndex = REGEXP_FONT_URL.lastIndex
    // __DEV__ && console.log('get fontSrc:', fontSrc, fontMIME)
  }
  if (!fragList.length) return Promise.resolve(cssString) // nothing
  fragList.push(cssString.slice(stringIndex)) // left string
  return fragList.join('')
}
// match woff2/woff/ttf font check https://regexr.com/3if5n
const REGEXP_FONT_URL = /\/?(\.?\.\/)*\b[-\w@:%_+.~#?&/=]+.(woff2|woff|ttf)([?#][-\w%._#=]{1,256})?/g

const getAbsoluteUrl = (url, originUrl) => {
  if (REGEXP_HOST_DOMAIN.exec(url)) return url // already absolute url
  const [ domain ] = REGEXP_HOST_DOMAIN.exec(originUrl) || [ '' ]
  const rawList = url[ 0 ] !== '/'
    ? [ ...originUrl.split('/').slice(0, -1), ...url.split('/') ] // concat relative url
    : [ domain.slice(0, -1), ...url.split('/').slice(1) ] // concat absolute url
  const reducedList = []
  rawList.forEach((frag) => (frag === '..' ? reducedList.pop() : reducedList.push(frag)))
  __DEV__ && console.log('[getAbsoluteUrl]', { url, domain, rawList, reducedList })
  return reducedList.join('/')
}
// match one valid domain, with port, not localhost, not IP, check https://regexr.com/3if55
const REGEXP_HOST_DOMAIN = /((https?:)?\/\/)?[-\w@:%._+~#=]{2,256}\.[a-z]{2,63}(:\d{1,5})?\//

export { convertDataUrl, inlineCSSFont }
