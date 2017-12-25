const REGEXP_IMAGE_TAG = /<img [^>]*>/g
const REGEXP_IMAGE_TAG_SRC = /src=['"]([^'"]*)['"]/

const REGEXP_INLINE_STYLE = /style=["]([^"]*)["]/g
const REGEXP_INLINE_STYLE_URL = /url\([']?([^)']*)[']?\)/

// collect HTML fragment & separate url
const createHTMLFragCollector = () => {
  let htmlFragList = [
    // mostly be: '<html string fragments>'
    // or for url: { urlString: '', dataUrl: '' } (from urlMap)
  ]
  let urlMap = {
    // [urlString]: { urlString: '', dataUrl: 'will have data after fetch' } // url to load
  }

  const replaceUrl = (urlString) => {
    if (urlMap[ urlString ] === undefined) urlMap[ urlString ] = { urlString, dataUrl: '' }
    return urlMap[ urlString ]
  }

  const collectImageTagSrc = createCollector(REGEXP_IMAGE_TAG, REGEXP_IMAGE_TAG_SRC) // collect <img src="URL">
  const collectStyleInlineUrl = createCollector(REGEXP_INLINE_STYLE, REGEXP_INLINE_STYLE_URL) // collect <div style="background: url(URL);" />

  return {
    getOutput: () => {
      const output = { htmlFragList, urlMap }
      htmlFragList = []
      urlMap = {}
      return output
    },
    collect: (fragString) => {
      // __DEV__ && console.log('[collect] fragString:', fragString)
      let collectFragList = [ fragString ]
      collectFragList = collectFragList.reduce((fragList, frag) => collectImageTagSrc(fragList, frag, replaceUrl), [])
      collectFragList = collectFragList.reduce((fragList, frag) => collectStyleInlineUrl(fragList, frag, replaceUrl), [])
      htmlFragList = htmlFragList.concat(collectFragList)
    }
  }
}

const createCollector = (regexpSearchBlock, regexpExtractUrl) => (fragList, frag, replaceUrl) => {
  if (typeof (frag) === 'object') {
    __DEV__ && console.log('[collector] get object frag', frag)
    fragList.push(frag)
    return fragList // skip urlInfo
  }
  let currentIndex = 0
  let searchResult
  while ((searchResult = regexpSearchBlock.exec(frag)) !== null) { // faster, search potential block
    __DEV__ && console.log('[collector] searchResult:', searchResult)
    const blockString = searchResult[ 0 ]
    const extractResult = regexpExtractUrl.exec(blockString) // slower & preciser, pick url
    const urlString = extractResult && extractResult[ 1 ]
    if (!urlString) continue
    const urlIndex = searchResult.index + extractResult.index + extractResult[ 0 ].indexOf(urlString)
    const preUrlFrag = frag.slice(currentIndex, urlIndex)
    fragList.push(preUrlFrag)
    fragList.push(replaceUrl(urlString))
    currentIndex = urlIndex + urlString.length
  }
  fragList.push(frag.substr(currentIndex))
  return fragList
}

export { createHTMLFragCollector }
