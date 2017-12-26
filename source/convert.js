import { fetchDataUrlWithCache } from './fetch'

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

const convertDataUrl = (urlString, originUrl) => {
  if (urlString.startsWith('data:')) return urlString // already a dataUrl
  if (urlString.startsWith('blob:')) return fetchDataUrlWithCache(urlString) // already a blobUrl

  if (originUrl) urlString = getAbsoluteUrl(urlString, originUrl)

  const regexResult = REGEXP_URL_EXTENSION.exec(urlString)
  const urlMIME = regexResult && EXTENSION_MIME_MAP[ regexResult[ 1 ].toLowerCase() ]
  __DEV__ && console.log('[convertDataUrl] get urlMIME:', { urlString, urlMIME })

  return urlMIME
    ? fetchDataUrlWithCache(urlString)
    : ''
}
const REGEXP_URL_EXTENSION = /\.([0-9a-z]{3,5})(?:[?#]|$)/i // check http://stackoverflow.com/questions/6582171/javascript-regex-for-matching-extracting-file-extension
const EXTENSION_MIME_MAP = {
  ttf: 'font/ttf',
  woff: 'font/woff',
  woff2: 'font/woff2',

  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  bmp: 'image/bmp',
  ico: 'image/x-icon'
}

const convertFragListWithUrlMap = async ({ urlMap = {}, fragList = [] }) => {
  for (const urlInfo of Object.values(urlMap)) {
    const { urlString, originUrl } = urlInfo
    urlInfo.dataUrl = (await convertDataUrl(urlString, originUrl)) || ''
  }

  for (let index = 0, indexMax = fragList.length; index < indexMax; index++) {
    const frag = fragList[ index ]
    if (typeof (frag) === 'object') fragList[ index ] = frag.dataUrl
  }

  return fragList
}

export {
  getAbsoluteUrl,
  convertDataUrl,
  convertFragListWithUrlMap
}
