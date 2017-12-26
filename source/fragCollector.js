const createFragCollector = ({ extractorList }) => {
  let fragList = [
    // mostly be: 'string fragments'
    // or for url: { urlString: '', dataUrl: '', originUrl: '' } (from urlMap)
  ]
  let urlMap = {
    // [urlString]: { urlString: '', dataUrl: 'will have data after fetch', originUrl: '' } // url to load
  }

  const getOutput = () => {
    const output = { fragList, urlMap }
    fragList = []
    urlMap = {}
    return output
  }

  const collect = (fragString, originUrl = '') => {
    // __DEV__ && console.log('[collect] fragString:', fragString)

    const getUrlInfo = (urlString) => {
      if (urlMap[ urlString ] === undefined) urlMap[ urlString ] = { urlString, dataUrl: '', originUrl }
      return urlMap[ urlString ]
    }

    const collectFragList = extractorList.reduce(
      (collectFragList, extractor) => collectFragList.reduce((fragList, frag) => extractor(fragList, frag, getUrlInfo), []),
      [ fragString ]
    )
    fragList = fragList.concat(collectFragList)
  }

  return { getOutput, collect }
}

const createUrlExtractor = (regexpSearchBlock, regexpExtractUrl) => (fragList, frag, getUrlInfo) => {
  if (typeof (frag) === 'object') {
    __DEV__ && console.log('[extractor] get object frag', frag)
    fragList.push(frag)
    return fragList // skip urlInfo
  }
  let currentIndex = 0
  let searchResult
  while ((searchResult = regexpSearchBlock.exec(frag)) !== null) { // faster, search potential block
    const blockString = searchResult[ 0 ]
    __DEV__ && console.log('[extractor] get blockString:', blockString)
    const extractResult = regexpExtractUrl.exec(blockString) // slower & preciser, pick url
    const urlString = extractResult && extractResult[ 1 ]
    __DEV__ && !urlString && console.warn('[extractor] false blockString:', blockString)
    if (!urlString) continue
    __DEV__ && console.log('[extractor] get urlString:', urlString)
    const urlIndex = searchResult.index + extractResult.index + extractResult[ 0 ].indexOf(urlString)
    const preUrlFrag = frag.slice(currentIndex, urlIndex)
    fragList.push(preUrlFrag)
    fragList.push(getUrlInfo(urlString))
    currentIndex = urlIndex + urlString.length
  }
  fragList.push(frag.substr(currentIndex))
  return fragList
}

const REGEXP_IMAGE_TAG = /<img [^>]*>/g
const REGEXP_IMAGE_TAG_SRC = /src=['"]([^'"]*)['"]/
const extractHTMLImageTagSrc = createUrlExtractor(REGEXP_IMAGE_TAG, REGEXP_IMAGE_TAG_SRC) // extract <img src="URL">

const REGEXP_INLINE_STYLE = /style=['"].*url\([^)]*\).*['"]/g
const REGEXP_INLINE_STYLE_URL = /url\(['"]?([^)'"]*)['"]?\)/
const extractHTMLStyleInlineUrl = createUrlExtractor(REGEXP_INLINE_STYLE, REGEXP_INLINE_STYLE_URL) // extract style="background: url(URL);"

// collect HTML fragment & separate url
const createHTMLFragCollector = () => createFragCollector({ extractorList: [ extractHTMLImageTagSrc, extractHTMLStyleInlineUrl ] })

const REGEXP_CSS_URL = /url\([^)]*\)/g
const extractCSSImageSrc = createUrlExtractor(REGEXP_CSS_URL, REGEXP_INLINE_STYLE_URL) // extract style="background: url(URL);"

const REGEXP_CSS_FONT_URL = /(\/?(\.?\.\/)*\b[-\w@:%_+.~#?&/=]+.(woff2|woff|ttf|svg))([?#][-\w%._#=]{1,256})?/g // match woff2/woff/ttf/svg font check https://regexr.com/3ifpv
const extractCSSFontSrc = createUrlExtractor(REGEXP_CSS_URL, REGEXP_CSS_FONT_URL) // extract src: url(Material-Icons.woff2) format('woff2');

// collect HTML fragment & separate url
const createCSSFragCollector = () => createFragCollector({ extractorList: [ extractCSSImageSrc, extractCSSFontSrc ] })

export {
  createFragCollector,
  createUrlExtractor,
  createHTMLFragCollector,
  createCSSFragCollector
}
