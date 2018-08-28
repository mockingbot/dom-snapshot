const createFragCollector = ({ extractorList, trimComment }) => {
  let fragList, urlMap, fontInfo

  const getOutput = () => {
    const output = { fragList, urlMap, fontInfo }
    fragList = [] // mostly be fragment string, some will be object for urlInfo: { urlString: '', originUrl: '', dataUrl: '', isIgnore: false } (from urlMap)
    urlMap = {} // [urlString]: { urlString: '', originUrl: '', dataUrl: 'will have data after fetch', isIgnore: false } // urlInfo: url to load
    fontInfo = {
      // fontTag = name|style|weight
      fontFaceMap: {}, // [fontTag]: Set[ urlInfo, urlInfo ]
      fontFamilySet: new Set() // name
    }
    return output
  }

  const collect = (fragString, originUrl = '', skipFontInfo = false) => { // initial fragString should be from file or innerHTML, relatively complete
    // __DEV__ && console.log('[collect] fragString:', fragString)
    if (fragString && trimComment) fragString = trimComment(fragString)
    if (!fragString) return

    const getUrlInfo = (urlString) => {
      if (urlMap[ urlString ] === undefined) urlMap[ urlString ] = { urlString, originUrl, dataUrl: '' }
      return urlMap[ urlString ]
    }
    const collectFragList = extractorList.reduce(
      (collectFragList, extractor) => collectFragList.reduce(
        (fragList, frag) => extractor(fragList, frag, getUrlInfo), []
      ),
      [ fragString ]
    )
    fragList = fragList.concat(collectFragList)

    if (!skipFontInfo && REGEXP_FONT_FAST.test(fragString)) { // get font info
      const tryGetFontFace = (fontFaceString) => {
        const [ name ] = tryGetFontFamily(fontFaceString)
        const urlInfoList = []
        name && extractCSSFontSrc([], fontFaceString, (urlString) => urlInfoList.push(getUrlInfo(urlString)))
        if (!urlInfoList.length) return
        const fontTag = `${name}|${tryGetFontStyle(fontFaceString)}|${tryGetFontWeight(fontFaceString)}`
        // __DEV__ && console.log('[tryGetFontFace]', fontFaceString, fontTag, urlInfoList)
        if (fontInfo.fontFaceMap[ fontTag ] === undefined) fontInfo.fontFaceMap[ fontTag ] = new Set(urlInfoList)
        else addArrayToSet(fontInfo.fontFaceMap[ fontTag ], urlInfoList)
      }
      let index = 0
      let result
      while ((result = REGEXP_GLOBAL_FONT_FACE.exec(fragString))) {
        const [ fontFaceString ] = result
        tryGetFontFace(fontFaceString)
        addArrayToSet(fontInfo.fontFamilySet, tryGetFontFamily(fragString.slice(index, result.index)))
        index = REGEXP_GLOBAL_FONT_FACE.lastIndex
      }
      addArrayToSet(fontInfo.fontFamilySet, tryGetFontFamily(fragString.slice(index)))
    }
  }

  getOutput() // init by reset

  return { getOutput, collect }
}

const addArrayToSet = (set, array) => array.forEach(set.add, set)

// extractor format:
// (fragList, frag, getUrlInfo) => fragList

const createUrlExtractor = (regexpSearchBlock, regexpExtractUrl) => {
  if (!regexpSearchBlock.global) throw new Error(`[createUrlExtractor] global expected for regexpSearchBlock: ${regexpSearchBlock}`)
  if (regexpExtractUrl.global) throw new Error(`[createUrlExtractor] non-global expected for regexpExtractUrl: ${regexpExtractUrl}`)
  return (fragList, frag, getUrlInfo) => {
    if (typeof (frag) === 'object') {
      __DEV__ && console.log(' - [extractor] get object frag', frag)
      fragList.push(frag)
      return fragList // skip urlInfo
    }
    let currentIndex = 0
    let searchResult
    while ((searchResult = regexpSearchBlock.exec(frag)) !== null) { // faster, search potential block
      const blockString = searchResult[ 0 ]
      __DEV__ && console.log(' - - [extractor] get blockString:', blockString)
      const extractResult = regexpExtractUrl.exec(blockString) // slower & preciser, pick url
      const urlString = extractResult && extractResult[ 1 ]
      __DEV__ && !urlString && console.warn(' - - [extractor] false blockString', { blockString, regexpExtractUrl })
      if (!urlString) continue
      __DEV__ && console.log(' - - [extractor] get urlString:', urlString)
      const urlIndex = searchResult.index + extractResult.index + extractResult[ 0 ].indexOf(urlString)
      const preUrlFrag = frag.slice(currentIndex, urlIndex)
      fragList.push(preUrlFrag)
      fragList.push(getUrlInfo(urlString))
      currentIndex = urlIndex + urlString.length
    }
    fragList.push(frag.substr(currentIndex))
    return fragList
  }
}

const REGEXP_GLOBAL_HTML_COMMENT = /<!--([\s\S]*?)-->/g // not considering edge cases
const REGEXP_GLOBAL_CSS_COMMENT = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g // not consider pattern in quotes, check: https://regexr.com/3ifpv

const REGEXP_GLOBAL_IMAGE_TAG = /<img [^>]*>/g
const REGEXP_IMAGE_TAG_SRC = /src=['"]([^'"]*)['"]/
const extractHTMLImageTagSrc = createUrlExtractor(REGEXP_GLOBAL_IMAGE_TAG, REGEXP_IMAGE_TAG_SRC) // extract <img src="URL">

const REGEXP_GLOBAL_INLINE_STYLE = /style=['"].*url\([^)]*\).*['"]/g
const REGEXP_INLINE_STYLE_URL = /url\(['"]?([^)'"]*)['"]?\)/
const extractHTMLStyleInlineUrl = createUrlExtractor(REGEXP_GLOBAL_INLINE_STYLE, REGEXP_INLINE_STYLE_URL) // extract style="background: url(URL);"

const REGEXP_GLOBAL_FONT_FACE = /@font-face\s+{[^}]+font-family[^}]+}/g // https://regexr.com/3ugm3

const REGEXP_FONT_FAST = /font(-family)?\s*:/
const REGEXP_GLOBAL_FONT_FAMILY = /font(-family)?\s*:\s*([^;}>]+)\s*[;}>]?/g // https://regexr.com/3ugnd
const tryGetFontFamily = (string) => {
  const nameList = []
  let result
  while ((result = REGEXP_GLOBAL_FONT_FAMILY.exec(string))) {
    const [ , isFontFamily, nameListString ] = result
    // font-family: all name, like: `font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;`
    // font: not all name, like: `font: italic 1.2em "Fira Sans", serif;`
    nameListString && nameListString.split(',').forEach((string, index) => {
      if (index === 0 && !isFontFamily) { // extract first font family name
        string = string.trim()
        string = string.split(/["']$/.test(string) ? /["']/ : ' ').filter(Boolean).pop()
      }
      const name = trimCSSName(string)
      name && nameList.push(name)
    })
  }
  return nameList
}

const REGEXP_FONT_STYLE = /font-style\s*:\s*(\w+)/
const tryGetFontStyle = (string) => (REGEXP_FONT_STYLE.exec(string) || [])[ 1 ] || 'normal'

const REGEXP_FONT_WEIGHT = /font-weight\s*:\s*(\w+)/ // https://regexr.com/3uigg
const tryGetFontWeight = (string) => {
  let fontWeight = (REGEXP_FONT_WEIGHT.exec(string) || [])[ 1 ]
  if (fontWeight === 'normal') fontWeight = '400'
  else if (fontWeight === 'bold') fontWeight = '700'
  return fontWeight || '400'
}

const REGEXP_DROP_QUOTES = /^["'](.*)["']$/
const trimCSSName = (string = '') => string.trim().replace(REGEXP_DROP_QUOTES, '$1')

// collect HTML fragment & separate url
const createHTMLFragCollector = () => createFragCollector({
  extractorList: [ extractHTMLImageTagSrc, extractHTMLStyleInlineUrl ],
  trimComment: (string) => string.replace(REGEXP_GLOBAL_HTML_COMMENT, '')
})

const REGEXP_GLOBAL_CSS_URL = /url\([^)]*\)/g
const extractCSSImageSrc = createUrlExtractor(REGEXP_GLOBAL_CSS_URL, REGEXP_INLINE_STYLE_URL) // extract style="background: url(URL);"

const REGEXP_CSS_FONT_URL = /(\/?(\.?\.\/)*\b[-\w@:%_+.~#?&/=]+.(woff2|woff|ttf|svg))([?#][-\w%._#=]{1,256})?/ // match woff2/woff/ttf/svg font check https://regexr.com/3ifpv
const extractCSSFontSrc = createUrlExtractor(REGEXP_GLOBAL_CSS_URL, REGEXP_CSS_FONT_URL) // extract src: url(Material-Icons.woff2) format('woff2');

// collect HTML fragment & separate url
const createCSSFragCollector = () => createFragCollector({
  extractorList: [ extractCSSImageSrc, extractCSSFontSrc ],
  trimComment: (string) => string.replace(REGEXP_GLOBAL_CSS_COMMENT, '')
})

export {
  createFragCollector,
  createUrlExtractor,
  createHTMLFragCollector,
  createCSSFragCollector
}
