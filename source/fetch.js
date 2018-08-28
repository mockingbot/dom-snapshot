const { fetch, FileReader, URL } = window

const dataUrlToBlobUrl = async (dataUrl) => {
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

const blobToDataUrl = (blob) => new Promise((resolve) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => resolve(reader.result), false)
  reader.readAsDataURL(blob)
})

// TODO: use create function to prevent global config data
let FETCH_OPTION = { method: 'GET', cache: 'default', mode: 'cors', credentials: 'same-origin' }
const setFetchOption = (option = {}) => { FETCH_OPTION = { ...FETCH_OPTION, ...option } }

let CACHED_TEXT_FETCH_MAP = {} // cache fetch promise to prevent multi request for the same source
let CACHED_BLOB_FETCH_MAP = {} // cache fetch promise to prevent multi request for the same source
const resetFetchCache = () => {
  CACHED_TEXT_FETCH_MAP = {}
  CACHED_BLOB_FETCH_MAP = {}
}

const fetchTextWithCache = (url) => {
  if (!CACHED_TEXT_FETCH_MAP[ url ]) {
    __DEV__ && console.log('fetchTextWithCache', url)
    CACHED_TEXT_FETCH_MAP[ url ] = fetch(url, FETCH_OPTION).then((response) => response.text())
  }
  return CACHED_TEXT_FETCH_MAP[ url ]
}

const fetchBlobWithCache = (url) => {
  if (!CACHED_BLOB_FETCH_MAP[ url ]) {
    __DEV__ && console.log('fetchBlobWithCache', url)
    CACHED_BLOB_FETCH_MAP[ url ] = fetch(url, FETCH_OPTION).then((response) => response.blob())
  }
  return CACHED_BLOB_FETCH_MAP[ url ]
}

const fetchDataUrlWithCache = async (dataUrl) => blobToDataUrl(await fetchBlobWithCache(dataUrl))

export {
  dataUrlToBlobUrl,
  blobToDataUrl,
  setFetchOption,
  resetFetchCache,
  fetchTextWithCache,
  fetchBlobWithCache,
  fetchDataUrlWithCache
}
