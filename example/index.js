(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DomSnapshot"] = factory();
	else
		root["DomSnapshot"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Convert": () => (/* reexport */ convert_namespaceObject),
  "Fetch": () => (/* reexport */ fetch_namespaceObject),
  "Format": () => (/* reexport */ format_namespaceObject),
  "FragCollector": () => (/* reexport */ fragCollector_namespaceObject),
  "Prepare": () => (/* reexport */ prepare_namespaceObject),
  "Resource": () => (/* reexport */ resource_namespaceObject),
  "Time": () => (/* reexport */ time_namespaceObject),
  "createSnapshotFromElement": () => (/* reexport */ createSnapshotFromElement),
  "createSnapshotFromHTMLSourceList": () => (/* reexport */ createSnapshotFromHTMLSourceList),
  "renderPngDataUrlFromSvgDataUrl": () => (/* reexport */ renderPngDataUrlFromSvgDataUrl)
});

// NAMESPACE OBJECT: ./node_modules/@dr-js/core/module/common/time.js
var time_namespaceObject = {};
__webpack_require__.r(time_namespaceObject);
__webpack_require__.d(time_namespaceObject, {
  "CLOCK_PER_SECOND": () => (CLOCK_PER_SECOND),
  "CLOCK_TO_SECOND": () => (CLOCK_TO_SECOND),
  "cancelFrameUpdate": () => (cancelFrameUpdate),
  "clock": () => (clock),
  "createStepper": () => (createStepper),
  "createTimer": () => (createTimer),
  "getTimestamp": () => (getTimestamp),
  "requestFrameUpdate": () => (requestFrameUpdate),
  "setAwaitAsync": () => (setAwaitAsync),
  "setTimeoutAsync": () => (setTimeoutAsync),
  "setWeakInterval": () => (setWeakInterval),
  "setWeakTimeout": () => (setWeakTimeout)
});

// NAMESPACE OBJECT: ./node_modules/@dr-js/core/module/common/format.js
var format_namespaceObject = {};
__webpack_require__.r(format_namespaceObject);
__webpack_require__.d(format_namespaceObject, {
  "binary": () => (binary),
  "decimal": () => (decimal),
  "describe": () => (describe),
  "mediaTime": () => (mediaTime),
  "padTable": () => (padTable),
  "percent": () => (percent),
  "prettyStringifyConfigObject": () => (prettyStringifyConfigObject),
  "prettyStringifyJSON": () => (prettyStringifyJSON),
  "time": () => (time),
  "typeNameOf": () => (typeNameOf)
});

// NAMESPACE OBJECT: ./node_modules/@dr-js/core/module/browser/resource.js
var resource_namespaceObject = {};
__webpack_require__.r(resource_namespaceObject);
__webpack_require__.d(resource_namespaceObject, {
  "createDownload": () => (createDownload),
  "createDownloadWithBlob": () => (createDownloadWithBlob),
  "createDownloadWithObject": () => (createDownloadWithObject),
  "createDownloadWithString": () => (createDownloadWithString),
  "deleteArrayBufferCache": () => (deleteArrayBufferCache),
  "loadArrayBufferCache": () => (loadArrayBufferCache),
  "loadImage": () => (loadImage),
  "loadScript": () => (loadScript),
  "loadText": () => (loadText),
  "saveArrayBufferCache": () => (saveArrayBufferCache)
});

// NAMESPACE OBJECT: ./source/fetch.js
var fetch_namespaceObject = {};
__webpack_require__.r(fetch_namespaceObject);
__webpack_require__.d(fetch_namespaceObject, {
  "blobToDataUrl": () => (blobToDataUrl),
  "dataUrlToBlobUrl": () => (dataUrlToBlobUrl),
  "fetchBlobWithCache": () => (fetchBlobWithCache),
  "fetchDataUrlWithCache": () => (fetchDataUrlWithCache),
  "fetchTextWithCache": () => (fetchTextWithCache),
  "resetFetchCache": () => (resetFetchCache),
  "setFetchOption": () => (setFetchOption)
});

// NAMESPACE OBJECT: ./source/convert.js
var convert_namespaceObject = {};
__webpack_require__.r(convert_namespaceObject);
__webpack_require__.d(convert_namespaceObject, {
  "convertDataUrl": () => (convertDataUrl),
  "convertFragListWithUrlMap": () => (convertFragListWithUrlMap),
  "getAbsoluteUrl": () => (getAbsoluteUrl)
});

// NAMESPACE OBJECT: ./source/fragCollector.js
var fragCollector_namespaceObject = {};
__webpack_require__.r(fragCollector_namespaceObject);
__webpack_require__.d(fragCollector_namespaceObject, {
  "createCSSFragCollector": () => (createCSSFragCollector),
  "createFragCollector": () => (createFragCollector),
  "createHTMLFragCollector": () => (createHTMLFragCollector),
  "createUrlExtractor": () => (createUrlExtractor)
});

// NAMESPACE OBJECT: ./source/prepare.js
var prepare_namespaceObject = {};
__webpack_require__.r(prepare_namespaceObject);
__webpack_require__.d(prepare_namespaceObject, {
  "prepareCSSString": () => (prepareCSSString),
  "prepareCanvasElement": () => (prepareCanvasElement),
  "prepareHTMLString": () => (prepareHTMLString),
  "prepareImageElement": () => (prepareImageElement),
  "prepareSVGString": () => (prepareSVGString)
});

;// CONCATENATED MODULE: ./node_modules/@dr-js/core/module/env/global.js
let globalCache;

const getGlobal = () => void 0 !== globalCache ? globalCache : globalCache = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof __webpack_require__.g ? __webpack_require__.g : undefined;

let environmentCache;

const getEnvironment = () => {
  if (void 0 === environmentCache) {
    const {
      process,
      window,
      document
    } = getGlobal();
    const isNode = void 0 !== process && void 0 !== process.versions && process.versions.node;
    const isBrowser = void 0 !== window && void 0 !== document;
    environmentCache = {
      isNode,
      isBrowser,
      environmentName: isNode ? "node" : isBrowser ? "browser" : "unknown"
    };
  }

  return environmentCache;
};


;// CONCATENATED MODULE: ./node_modules/@dr-js/core/module/common/time.js

const CLOCK_PER_SECOND = 1e3;
const CLOCK_TO_SECOND = .001;

const clock = (() => {
  try {
    const {
      performance
    } = getGlobal();

    const clock = () => performance.now();

    if (clock() <= clock()) return clock;
  } catch (error) {}

  try {
    const {
      process
    } = getGlobal();

    const clock = () => {
      const [seconds, nanoseconds] = process.hrtime();
      return 1e3 * seconds + 1e-6 * nanoseconds;
    };

    if (clock() <= clock()) return clock;
  } catch (error) {}

  return Date.now;
})();

const getTimestamp = () => Math.floor(.001 * Date.now());

const [setWeakTimeout, setWeakInterval] = (() => {
  try {
    const toWeakTimer = func => (...args) => {
      const token = func(...args);
      token.unref();
      return token;
    };

    const token = setTimeout(() => {}, 0);
    clearTimeout(token);
    if ("function" == typeof token.unref) return [setTimeout, setInterval].map(toWeakTimer);
  } catch (error) {}

  return [setTimeout, setInterval];
})();

const setTimeoutAsync = (wait = 0) => new Promise(resolve => setTimeout(resolve, wait));

const setAwaitAsync = async (awaitCount = 0) => {
  for (; awaitCount > 0;) {
    await null;
    awaitCount--;
  }
};

const [requestFrameUpdate, cancelFrameUpdate] = getGlobal().requestAnimationFrame ? [getGlobal().requestAnimationFrame, getGlobal().cancelAnimationFrame] : [func => setTimeout(func, 1e3 / 60), clearTimeout];

const createTimer = ({
  func,
  delay,
  queueTask = setTimeout,
  cancelTask = clearTimeout
}) => {
  let token = null;

  const update = () => {
    if (token) {
      token = queueTask(update, delay);
      func();
    }
  };

  const start = () => {
    token || (token = queueTask(update, delay));
  };

  const stop = () => {
    if (token) {
      cancelTask(token);
      token = null;
    }
  };

  return {
    start,
    stop,
    isActive: () => Boolean(token),
    getDelay: () => delay,
    setDelay: nextDelay => {
      if (nextDelay !== delay) {
        delay = nextDelay;
        stop();
        start();
      }
    }
  };
};

const createStepper = (prevTime = clock()) => () => {
  const nextTime = clock();
  const result = nextTime - prevTime;
  prevTime = nextTime;
  return result;
};


;// CONCATENATED MODULE: ./node_modules/@dr-js/core/module/common/format.js
const typeNameOf = value => Object.prototype.toString.call(value).slice(8, -1);

const escapeString = string => JSON.stringify(string).slice(1, -1);

const quickStringify = (valueType, value) => "String" === valueType ? JSON.stringify(value) : "Object" === valueType ? `{${escapeString(Object.keys(value))}}` : "Array" === valueType ? value.length <= 8 ? `[${value.map(describe).join(", ")}]` : `[#${value.length}]` : "RegExp" === valueType ? String(value) : valueType.endsWith("Function") ? value.name || "anonymous" : escapeString(String(value));

const describe = value => {
  const valueType = typeNameOf(value);
  return `<${valueType}> ${quickStringify(valueType, value)}`;
};

const percent = value => `${(100 * value).toFixed(2)}%`;

const twoDigit = value => String(Math.floor(value)).padStart(2, "0");

const mediaTime = value => {
  const abs = Math.abs(value);
  return `${value < 0 ? "-" : ""}${twoDigit(abs / 60)}:${twoDigit(abs % 60)}`;
};

const decimal = value => {
  const abs = .75 * Math.abs(value);
  return 0 === abs ? "0" : abs < 1e-9 ? `${(value / 1e-12).toFixed(2)}pico` : abs < 1e-6 ? `${(value / 1e-9).toFixed(2)}nano` : abs < .001 ? `${(value / 1e-6).toFixed(2)}micro` : abs < 1 ? `${(value / .001).toFixed(2)}milli` : abs < 1e3 ? `${(value / 1).toFixed(2)}` : abs < 1e6 ? `${(value / 1e3).toFixed(2)}kilo` : abs < 1e9 ? `${(value / 1e6).toFixed(2)}mega` : abs < 1e12 ? `${(value / 1e9).toFixed(2)}giga` : abs < 1e15 ? `${(value / 1e12).toFixed(2)}tera` : abs < 1e18 ? `${(value / 1e15).toFixed(2)}peta` : `${(value / 1e18).toFixed(2)}exa`;
};

const time = value => {
  const abs = .75 * Math.abs(value);
  return abs < 1e3 ? `${Math.floor(value)}ms` : abs < 6e4 ? `${(value / 1e3).toFixed(2)}s` : abs < 36e5 ? `${(value / 6e4).toFixed(2)}m` : abs < 864e5 ? `${(value / 36e5).toFixed(2)}h` : `${(value / 864e5).toFixed(2)}d`;
};

const binary = value => {
  const abs = .75 * Math.abs(value);
  return abs < 1024 ? `${Math.floor(value)}` : abs < 1048576 ? `${(value / 1024).toFixed(2)}Ki` : abs < 1073741824 ? `${(value / 1048576).toFixed(2)}Mi` : abs < 1099511627776 ? `${(value / 1073741824).toFixed(2)}Gi` : `${(value / 1099511627776).toFixed(2)}Ti`;
};

const padTable = ({
  table,
  padFuncList = [],
  cellPad = " | ",
  rowPad = "\n",
  widthMaxList = table.reduce((o, rowList) => {
    rowList.forEach((value, index) => {
      o[index] = Math.max(String(value).length, o[index] || 0);
    });
    return o;
  }, [])
}) => table.map(rowList => rowList.map((value, index) => {
  const string = String(value);
  const padFunc = padFuncList[index];
  const maxWidth = widthMaxList[index];
  return padFunc && "L" !== padFunc ? "R" === padFunc ? string.padStart(maxWidth) : padFunc(string, maxWidth) : string.padEnd(maxWidth);
}).join(cellPad)).join(rowPad);

const prettyStringifyJSON = (value, unfoldLevel = 2, pad = "  ") => {
  const stringifySwitch = (resultList, value, level, padString) => {
    if (level >= 1 && value) {
      if (Array.isArray(value)) return stringifyArray(resultList, value, level, padString);
      if ("object" == typeof value) return stringifyObject(resultList, value, level, padString);
    }

    const result = JSON.stringify(value);
    const isSkippedResult = void 0 === result;
    !isSkippedResult && resultList.push(result);
    return isSkippedResult;
  };

  const stringifyObject = (resultList, object, level, padString) => {
    const keyList = Object.keys(object);
    resultList.push("{\n");
    const resultListLength = resultList.length;
    const nextLevel = level - 1;
    const nextPadString = `${padString}${pad}`;

    for (let index = 0, indexMax = keyList.length; index < indexMax; index++) {
      const key = keyList[index];
      const value = object[key];
      const startIndex = resultList.length;
      resultList.push("");
      if (stringifySwitch(resultList, value, nextLevel, nextPadString)) resultList.length--;else {
        resultList[startIndex] = `${nextPadString}${JSON.stringify(key)}: `;
        resultList.push(",\n");
      }
    }

    resultList[resultList.length - 1] = resultList.length === resultListLength ? "{}" : `\n${padString}}`;
  };

  const stringifyArray = (resultList, array, level, padString) => {
    resultList.push("[\n");
    const resultListLength = resultList.length;
    const nextLevel = level - 1;
    const nextPadString = `${padString}${pad}`;

    for (let index = 0, indexMax = array.length; index < indexMax; index++) {
      const value = array[index];
      resultList.push(nextPadString);
      stringifySwitch(resultList, value, nextLevel, nextPadString) && resultList.push("null");
      resultList.push(",\n");
    }

    resultList[resultList.length - 1] = resultList.length === resultListLength ? "[]" : `\n${padString}]`;
  };

  const resultList = [];
  stringifySwitch(resultList, value, Math.max(unfoldLevel, 0) || 0, "");
  return resultList.join("");
};

const prettyStringifyConfigObject = (value, pad = "  ", padStringInitial = "") => {
  if ("string" != typeof pad || pad.length < 2) throw new Error(`invalid pad: ${String(pad)}`);

  const isLastResultTag = resultList => {
    const value = resultList[resultList.length - 1];
    return ": " === value || "- " === value;
  };

  const stringifySwitch = (resultList, value, padString) => {
    const valueType = typeNameOf(value);
    if ("Array" === valueType) return stringifyArray(resultList, value, padString);
    if ("Object" === valueType) return stringifyObject(resultList, value, padString);
    resultList.push(valueType.endsWith("Function") ? valueType : quickStringify(valueType, value), "\n");
  };

  const stringifyObject = (resultList, object, padString) => {
    const keyList = Object.keys(object);
    if (0 === keyList.length) return resultList.push("{}", "\n");
    isLastResultTag(resultList) && resultList.push("\n");

    for (let index = 0, indexMax = keyList.length; index < indexMax; index++) {
      const key = keyList[index];
      const value = object[key];
      resultList.push(padString, escapeString(key), ": ");
      stringifySwitch(resultList, value, `${padString}${pad}`);
    }
  };

  const stringifyArray = (resultList, array, padString) => {
    if (0 === array.length) return resultList.push("[]", "\n");
    isLastResultTag(resultList) && resultList.push("\n");

    for (let index = 0, indexMax = array.length; index < indexMax; index++) {
      const value = array[index];
      resultList.push(padString, "- ");
      stringifySwitch(resultList, value, `${padString}${pad}`);
    }
  };

  const resultList = [];
  stringifySwitch(resultList, value, padStringInitial);
  resultList.length--;
  1 === resultList.length && resultList.unshift(padStringInitial);
  return resultList.join("");
};


;// CONCATENATED MODULE: ./node_modules/@dr-js/core/module/common/module/MIME.js
const DEFAULT_MIME = "application/octet-stream";
const BASIC_EXTENSION_MAP = ["application/gzip;gz", "application/javascript;js;mjs", "application/json", "application/pdf", "application/xml", "application/x-7z-compressed;7z", "application/x-tar;tar", "application/zip", "audio/midi;mid", "audio/mpeg;mp3", "audio/ogg", "audio/wav", "audio/webm;weba", "audio/x-flac;flac", "font/ttf", "font/otf", "font/woff", "font/woff2", "image/bmp", "image/gif", "image/jpeg;jpg", "image/png", "image/svg+xml;svg", "image/webp", "image/x-icon;ico", "text/css", "text/csv", "text/html;htm", "text/plain;txt;text;conf;log;ini", "text/rtf", "text/xml", "video/mp4;mp4v;mpg4", "video/mpeg;mpg", "video/webm", "video/x-flv;flv", "video/x-ms-wmv;wmv", "video/x-msvideo;avi"].reduce((o, mimeData) => {
  const [mime] = mimeData.split(";");
  mimeData.split("/")[1].split(";").forEach(extension => o[extension] = mime);
  return o;
}, {});
const REGEXP_EXTENSION = /\.(\w+)$/;

const getMIMETypeFromFileName = fileName => {
  const result = REGEXP_EXTENSION.exec(fileName);
  return result && BASIC_EXTENSION_MAP[result[1]] || "application/octet-stream";
};


;// CONCATENATED MODULE: ./node_modules/@dr-js/core/module/browser/DOM.js

const {
  requestAnimationFrame,
  document: DOM_document,
  navigator: DOM_navigator,
  caches,
  URL,
  Blob,
  Request,
  Response
} = window;

const throttleByAnimationFrame = func => {
  let callArgs = null;

  const frameFunc = () => {
    const currentCallArgs = callArgs;
    callArgs = null;
    func.apply(null, currentCallArgs);
  };

  return (...args) => {
    !callArgs && requestAnimationFrame(frameFunc);
    callArgs = args;
  };
};

const applyReceiveFileListListener = (eventSource = DOM_document, onFileList) => {
  const muteEvent = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const pasteListener = event => {
    const {
      files
    } = event.dataTransfer || event.clipboardData;
    files && files.length && onFileList(files);
  };

  const dropListener = event => {
    muteEvent(event);
    pasteListener(event);
  };

  eventSource.addEventListener("dragenter", muteEvent);
  eventSource.addEventListener("dragover", muteEvent);
  eventSource.addEventListener("drop", dropListener);
  eventSource.addEventListener("paste", pasteListener);
  return () => {
    eventSource.removeEventListener("dragenter", muteEvent);
    eventSource.removeEventListener("dragover", muteEvent);
    eventSource.removeEventListener("drop", dropListener);
    eventSource.removeEventListener("paste", pasteListener);
  };
};

const getPathElementList = (fromElement, toElement) => {
  if (!fromElement.contains(toElement)) return [];
  let element = toElement;
  const elementList = [];

  for (; element !== fromElement;) {
    elementList.unshift(element);
    element = element.parentElement;
  }

  return elementList;
};

const getElementAtViewport = (clientPosition, excludeElementList) => {
  const styleRecoverList = excludeElementList && excludeElementList.map(element => {
    const {
      visibility
    } = element.style;
    element.style.visibility = "hidden";
    return visibility;
  });
  const elementUnder = DOM_document.elementFromPoint(clientPosition.x, clientPosition.y);
  excludeElementList && excludeElementList.forEach((element, index) => element.style.visibility = styleRecoverList[index]);
  return elementUnder;
};

const createElement = (tagName, attributeMap = {}) => Object.assign(DOM_document.createElement(tagName), attributeMap);

const createDownload = (fileName, url) => {
  const element = createElement("a", {
    download: fileName,
    href: url
  });
  DOM_document.body.appendChild(element);
  element.click();
  DOM_document.body.removeChild(element);
};

const createDownloadWithBlob = (fileName, blob) => {
  if (DOM_navigator.msSaveOrOpenBlob) return DOM_navigator.msSaveOrOpenBlob(blob, fileName);
  const objectUrl = URL.createObjectURL(blob);
  createDownload(fileName, objectUrl);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 5e3);
};

const createDownloadWithString = (fileName, string, type = BASIC_EXTENSION_MAP.txt) => createDownloadWithBlob(fileName, new Blob([string], {
  type
}));

const createDownloadWithObject = (fileName, object, type = BASIC_EXTENSION_MAP.json) => createDownloadWithString(fileName, JSON.stringify(object), type);

const saveArrayBufferCache = async (bucketName, key, arrayBuffer) => {
  const cache = await caches.open(bucketName);
  await cache.put(new Request(key), new Response(arrayBuffer));
  return {
    bucketName,
    key
  };
};

const loadArrayBufferCache = async (bucketName, key) => {
  const cache = await caches.open(bucketName);
  const response = await cache.match(new Request(key));
  return response && response.arrayBuffer();
};

const deleteArrayBufferCache = async (bucketName, key) => {
  if (!key) return caches.delete(bucketName);
  const cache = await caches.open(bucketName);
  return cache && cache.delete(new Request(key));
};


;// CONCATENATED MODULE: ./node_modules/@dr-js/core/module/browser/resource.js


const {
  document: resource_document,
  fetch
} = window;

const loadText = async uri => (await fetch(uri)).text();

const loadImage = uri => new Promise((resolve, reject) => createElement("img", {
  src: uri,
  onerror: reject,
  onload: event => resolve(event.currentTarget)
}));

const loadScript = uri => new Promise((resolve, reject) => resource_document.body.appendChild(createElement("script", {
  src: uri,
  async: !1,
  type: BASIC_EXTENSION_MAP.js,
  onerror: reject,
  onload: event => resolve(event.currentTarget)
})));



;// CONCATENATED MODULE: ./source/fetch.js
const {
  fetch: fetch_fetch,
  FileReader,
  URL: fetch_URL
} = window;

const dataUrlToBlobUrl = async dataUrl => {
  const response = await fetch_fetch(dataUrl);
  const blob = await response.blob();
  return fetch_URL.createObjectURL(blob);
};

const blobToDataUrl = blob => new Promise(resolve => {
  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result), false);
  reader.readAsDataURL(blob);
}); // TODO: use create function to prevent global config data


let FETCH_OPTION = {
  method: 'GET',
  cache: 'default',
  mode: 'cors',
  credentials: 'same-origin'
};

const setFetchOption = (option = {}) => {
  FETCH_OPTION = { ...FETCH_OPTION,
    ...option
  };
};

let CACHED_TEXT_FETCH_MAP = {}; // cache fetch promise to prevent multi request for the same source

let CACHED_BLOB_FETCH_MAP = {}; // cache fetch promise to prevent multi request for the same source

const resetFetchCache = () => {
  CACHED_TEXT_FETCH_MAP = {};
  CACHED_BLOB_FETCH_MAP = {};
};

const fetchTextWithCache = url => {
  if (!CACHED_TEXT_FETCH_MAP[url]) {
     false && 0;
    CACHED_TEXT_FETCH_MAP[url] = fetch_fetch(url, FETCH_OPTION).then(response => response.text());
  }

  return CACHED_TEXT_FETCH_MAP[url];
};

const fetchBlobWithCache = url => {
  if (!CACHED_BLOB_FETCH_MAP[url]) {
     false && 0;
    CACHED_BLOB_FETCH_MAP[url] = fetch_fetch(url, FETCH_OPTION).then(response => response.blob());
  }

  return CACHED_BLOB_FETCH_MAP[url];
};

const fetchDataUrlWithCache = async dataUrl => blobToDataUrl(await fetchBlobWithCache(dataUrl));


;// CONCATENATED MODULE: ./source/convert.js


const getAbsoluteUrl = (url, originUrl) => {
  if (REGEXP_HOST_DOMAIN.exec(url)) return url; // already absolute url

  const [domain] = REGEXP_HOST_DOMAIN.exec(originUrl) || [''];
  const rawList = url[0] !== '/' ? [...originUrl.split('/').slice(0, -1), ...url.split('/')] // concat relative url
  : [domain.slice(0, -1), ...url.split('/').slice(1)]; // concat absolute url

  const reducedList = [];
  rawList.forEach(frag => frag === '..' ? reducedList.pop() : reducedList.push(frag));
   false && 0;
  return reducedList.join('/');
}; // match one valid domain, with port, not localhost, not IP, check https://regexr.com/3if55


const REGEXP_HOST_DOMAIN = /((https?:)?\/\/)?[-\w@:%._+~#=]{2,256}\.[a-z]{2,63}(:\d{1,5})?\//;

const convertDataUrl = (urlString, originUrl) => {
  if (urlString.startsWith('data:')) return urlString; // already a dataUrl

  if (urlString.startsWith('blob:')) return fetchDataUrlWithCache(urlString); // already a blobUrl

  if (originUrl) urlString = getAbsoluteUrl(urlString, originUrl);
  const regexResult = REGEXP_URL_EXTENSION.exec(urlString);
  const urlMIME = regexResult && EXTENSION_MIME_MAP[regexResult[1].toLowerCase()];
   false && 0;
  return urlMIME ? fetchDataUrlWithCache(urlString) : '';
};

const REGEXP_URL_EXTENSION = /\.([0-9a-z]{3,5})(?:[?#]|$)/i; // check http://stackoverflow.com/questions/6582171/javascript-regex-for-matching-extracting-file-extension

const EXTENSION_MIME_MAP = {
  woff2: 'font/woff2',
  woff: 'font/woff',
  ttf: 'font/ttf',
  otf: 'font/otf',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  bmp: 'image/bmp',
  ico: 'image/x-icon'
};

const convertFragListWithUrlMap = async ({
  urlMap = {},
  fragList = []
}) => {
  for (const urlInfo of Object.values(urlMap)) {
    const {
      urlString,
      originUrl,
      isIgnore
    } = urlInfo;
    urlInfo.dataUrl = isIgnore ? urlString : (await convertDataUrl(urlString, originUrl)) || '';
  }

  for (let index = 0, indexMax = fragList.length; index < indexMax; index++) {
    const frag = fragList[index];
    if (typeof frag === 'object') fragList[index] = frag.dataUrl;
  }

  return fragList;
};


;// CONCATENATED MODULE: ./source/fragCollector.js
const createFragCollector = ({
  extractorList,
  trimComment
}) => {
  let fragList, urlMap, fontInfo;

  const getOutput = () => {
    const output = {
      fragList,
      urlMap,
      fontInfo
    };
    fragList = []; // mostly be fragment string, some will be object for urlInfo: { urlString: '', originUrl: '', dataUrl: '', isIgnore: false } (from urlMap)

    urlMap = {}; // [urlString]: { urlString: '', originUrl: '', dataUrl: 'will have data after fetch', isIgnore: false } // urlInfo: url to load

    fontInfo = {
      // fontTag = name|style|weight
      fontFaceMap: {},
      // [fontTag]: Set[ urlInfo, urlInfo ]
      fontFamilySet: new Set() // name

    };
    return output;
  };

  const collect = (fragString, originUrl = '', skipFontInfo = false) => {
    // initial fragString should be from file or innerHTML, relatively complete
    // __DEV__ && console.log('[collect] fragString:', fragString)
    if (fragString && trimComment) fragString = trimComment(fragString);
    if (!fragString) return;

    const getUrlInfo = urlString => {
      if (urlMap[urlString] === undefined) urlMap[urlString] = {
        urlString,
        originUrl,
        dataUrl: ''
      };
      return urlMap[urlString];
    };

    const collectFragList = extractorList.reduce((collectFragList, extractor) => collectFragList.reduce((fragList, frag) => extractor(fragList, frag, getUrlInfo), []), [fragString]);
    fragList = fragList.concat(collectFragList);

    if (!skipFontInfo && REGEXP_FONT_FAST.test(fragString)) {
      // get font info
      const tryGetFontFace = fontFaceString => {
        const [name] = tryGetFontFamily(fontFaceString);
        const urlInfoList = [];
        name && extractCSSFontSrc([], fontFaceString, urlString => urlInfoList.push(getUrlInfo(urlString)));
        if (!urlInfoList.length) return;
        const fontTag = `${name}|${tryGetFontStyle(fontFaceString)}|${tryGetFontWeight(fontFaceString)}`; // __DEV__ && console.log('[tryGetFontFace]', fontFaceString, fontTag, urlInfoList)

        if (fontInfo.fontFaceMap[fontTag] === undefined) fontInfo.fontFaceMap[fontTag] = new Set(urlInfoList);else addArrayToSet(fontInfo.fontFaceMap[fontTag], urlInfoList);
      };

      let index = 0;
      let result;

      while (result = REGEXP_GLOBAL_FONT_FACE.exec(fragString)) {
        const [fontFaceString] = result;
        tryGetFontFace(fontFaceString);
        addArrayToSet(fontInfo.fontFamilySet, tryGetFontFamily(fragString.slice(index, result.index)));
        index = REGEXP_GLOBAL_FONT_FACE.lastIndex;
      }

      addArrayToSet(fontInfo.fontFamilySet, tryGetFontFamily(fragString.slice(index)));
    }
  };

  getOutput(); // init by reset

  return {
    getOutput,
    collect
  };
};

const addArrayToSet = (set, array) => array.forEach(set.add, set); // extractor format:
// (fragList, frag, getUrlInfo) => fragList


const createUrlExtractor = (regexpSearchBlock, regexpExtractUrl) => {
  if (!regexpSearchBlock.global) throw new Error(`[createUrlExtractor] global expected for regexpSearchBlock: ${regexpSearchBlock}`);
  if (regexpExtractUrl.global) throw new Error(`[createUrlExtractor] non-global expected for regexpExtractUrl: ${regexpExtractUrl}`);
  return (fragList, frag, getUrlInfo) => {
    if (typeof frag === 'object') {
       false && 0;
      fragList.push(frag);
      return fragList; // skip urlInfo
    }

    let currentIndex = 0;
    let searchResult;

    while ((searchResult = regexpSearchBlock.exec(frag)) !== null) {
      // faster, search potential block
      const blockString = searchResult[0];
       false && 0;
      const extractResult = regexpExtractUrl.exec(blockString); // slower & preciser, pick url

      const urlString = extractResult && extractResult[1];
       false && 0;
      if (!urlString) continue;
       false && 0;
      const urlIndex = searchResult.index + extractResult.index + extractResult[0].indexOf(urlString);
      const preUrlFrag = frag.slice(currentIndex, urlIndex);
      fragList.push(preUrlFrag);
      fragList.push(getUrlInfo(urlString));
      currentIndex = urlIndex + urlString.length;
    }

    fragList.push(frag.substr(currentIndex));
    return fragList;
  };
};

const REGEXP_GLOBAL_HTML_COMMENT = /<!--([\s\S]*?)-->/g; // not considering edge cases

const REGEXP_GLOBAL_CSS_COMMENT = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g; // not consider pattern in quotes, check: https://regexr.com/3ifpv

const REGEXP_GLOBAL_IMAGE_TAG = /<img [^>]*>/g;
const REGEXP_IMAGE_TAG_SRC = /src=['"]([^'"]*)['"]/;
const extractHTMLImageTagSrc = createUrlExtractor(REGEXP_GLOBAL_IMAGE_TAG, REGEXP_IMAGE_TAG_SRC); // extract <img src="URL">

const REGEXP_GLOBAL_INLINE_STYLE = /style=['"].*url\([^)]*\).*['"]/g;
const REGEXP_INLINE_STYLE_URL = /url\(['"]?([^)'"]*)['"]?\)/;
const extractHTMLStyleInlineUrl = createUrlExtractor(REGEXP_GLOBAL_INLINE_STYLE, REGEXP_INLINE_STYLE_URL); // extract style="background: url(URL);"

const REGEXP_GLOBAL_FONT_FACE = /@font-face\s+{[^}]+font-family[^}]+}/g; // https://regexr.com/3ugm3

const REGEXP_FONT_FAST = /font(-family)?\s*:/;
const REGEXP_GLOBAL_FONT_FAMILY = /font(-family)?\s*:\s*([^;}>]+)\s*[;}>]?/g; // https://regexr.com/3ugnd

const tryGetFontFamily = string => {
  const nameList = [];
  let result;

  while (result = REGEXP_GLOBAL_FONT_FAMILY.exec(string)) {
    const [, isFontFamily, nameListString] = result; // font-family: all name, like: `font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;`
    // font: not all name, like: `font: italic 1.2em "Fira Sans", serif;`

    nameListString && nameListString.split(',').forEach((string, index) => {
      if (index === 0 && !isFontFamily) {
        // extract first font family name
        string = string.trim();
        string = string.split(/["']$/.test(string) ? /["']/ : ' ').filter(Boolean).pop();
      }

      const name = trimCSSName(string);
      name && nameList.push(name);
    });
  }

  return nameList;
};

const REGEXP_FONT_STYLE = /font-style\s*:\s*(\w+)/;

const tryGetFontStyle = string => (REGEXP_FONT_STYLE.exec(string) || [])[1] || 'normal';

const REGEXP_FONT_WEIGHT = /font-weight\s*:\s*(\w+)/; // https://regexr.com/3uigg

const tryGetFontWeight = string => {
  let fontWeight = (REGEXP_FONT_WEIGHT.exec(string) || [])[1];
  if (fontWeight === 'normal') fontWeight = '400';else if (fontWeight === 'bold') fontWeight = '700';
  return fontWeight || '400';
};

const REGEXP_DROP_QUOTES = /^["'](.*)["']$/;

const trimCSSName = (string = '') => string.trim().replace(REGEXP_DROP_QUOTES, '$1'); // collect HTML fragment & separate url


const createHTMLFragCollector = () => createFragCollector({
  extractorList: [extractHTMLImageTagSrc, extractHTMLStyleInlineUrl],
  trimComment: string => string.replace(REGEXP_GLOBAL_HTML_COMMENT, '')
});

const REGEXP_GLOBAL_CSS_URL = /url\([^)]*\)/g;
const extractCSSImageSrc = createUrlExtractor(REGEXP_GLOBAL_CSS_URL, REGEXP_INLINE_STYLE_URL); // extract style="background: url(URL);"

const REGEXP_CSS_FONT_URL = /(\/?(\.?\.\/)*\b[-\w@:%_+.~#?&/=]+.(woff2|woff|ttf|svg))([?#][-\w%._#=]{1,256})?/; // match woff2/woff/ttf/svg font check https://regexr.com/3ifpv

const extractCSSFontSrc = createUrlExtractor(REGEXP_GLOBAL_CSS_URL, REGEXP_CSS_FONT_URL); // extract src: url(Material-Icons.woff2) format('woff2');
// collect HTML fragment & separate url

const createCSSFragCollector = () => createFragCollector({
  extractorList: [extractCSSImageSrc, extractCSSFontSrc],
  trimComment: string => string.replace(REGEXP_GLOBAL_CSS_COMMENT, '')
});


;// CONCATENATED MODULE: ./source/prepare.js
const {
  document: prepare_document
} = window;

const prepareHTMLString = async convertedFragList => convertedFragList.join('').replace(/<br>/g, '<br/>') // FIX: wrong tag
.replace(/&nbsp;/g, ' ') // FIX: svg don't support these markup
.replace(REGEXP_GLOBAL_MULTILINE_XML_INVALID_CHAR, '');

const prepareCSSString = async convertedFragList => `<style>${UA_CSS_PATCH}${convertedFragList.join('')}</style>`.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, '') // Remove CSS comments. CHECK: https://stackoverflow.com/questions/9329552/explain-regex-that-finds-css-comments
.replace(/#iefix&/g, '') // FIX: svg don't support this tag
.replace(REGEXP_GLOBAL_MULTILINE_XML_INVALID_CHAR, ''); // remove XML invalid Char value


const REGEXP_GLOBAL_MULTILINE_XML_INVALID_CHAR = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm; // eslint-disable-line no-control-regex

const UA_CSS_PATCH = `
input[type="radio"] { -webkit-appearance: radio; -moz-appearance: radio; }
input[type="checkbox"] { -webkit-appearance: checkbox; -moz-appearance: checkbox; }
input[type="radio"], input[type="checkbox"] { box-sizing: border-box; max-width: 20px; max-height: 20px; }
input { -webkit-appearance: textfield; -moz-appearance: textfield; }
select { -webkit-appearance: menulist; -moz-appearance: menulist; }
`;

const prepareSVGString = ({
  domString,
  width,
  height
}) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${width}" height="${height}">
<switch>
  <foreignObject width="${width}" height="${height}">
    <body xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px">${domString}</body>
  </foreignObject>
  <text font-size="24">
    <tspan x="${width / 2}" y="${height / 2}" text-anchor="middle">Feature not supported</tspan>
  </text>
</switch>
</svg>`;

const prepareImageElement = ({
  svgDataUrl,
  width,
  height
}) => new Promise((resolve, reject) => {
  const imageElement = prepare_document.createElement('img');
  imageElement.addEventListener('error', reject);
  imageElement.addEventListener('load', () => resolve(imageElement));
  imageElement.crossOrigin = 'anonymous';
  imageElement.width = width;
  imageElement.height = height;
  imageElement.src = svgDataUrl;
});

const prepareCanvasElement = ({
  imageElement,
  width,
  height
}) => new Promise(resolve => {
  const canvasElement = prepare_document.createElement('canvas');
  canvasElement.width = width;
  canvasElement.height = height;
  setTimeout(() => {
    // TODO: HACK: if direct return, Chrome in Linux will crash (but not Firefox)
    canvasElement.getContext('2d').drawImage(imageElement, 0, 0);
    resolve(canvasElement);
  }, 0);
});


;// CONCATENATED MODULE: ./source/snapshot.js




const {
  document: snapshot_document
} = window;

const createSnapshotFromElement = async ({
  element,
  width,
  height,
  skipHeavyRender = false
}) => {
  if (!element) throw new Error(`invalid element: ${element}`);
  width = parseInt(width || element.style.width.endsWith('px') && element.style.width || element.offsetWidth);
  height = parseInt(height || element.style.height.endsWith('px') && element.style.height || element.offsetHeight);
  if (!width || !height) throw new Error(`can not get output size: width: ${width}, height: ${height}`);
  const htmlSourceList = new window.XMLSerializer().serializeToString(element).split('\n');
   false && 0;
  return createSnapshotFromHTMLSourceList({
    htmlSourceList,
    width,
    height,
    skipHeavyRender
  });
};

const createSnapshotFromHTMLSourceList = async ({
  htmlSourceList,
  width,
  height,
  skipHeavyRender = false
}) => {
  if (!Array.isArray(htmlSourceList)) throw new Error(`invalid htmlSourceList: ${htmlSourceList}`);
  if (!width || !height) throw new Error(`invalid size: width: ${width}, height: ${height}`);
  const htmlFragCollector = createHTMLFragCollector();
  htmlSourceList.forEach(fragString => htmlFragCollector.collect(fragString, ''));
  const cssFragCollector = createCSSFragCollector();
  const cssUrlList = Array.from(snapshot_document.getElementsByTagName('link')).map(element => element.rel === 'stylesheet' && element.href).filter(href => href);

  for (const cssUrl of cssUrlList) {
    cssFragCollector.collect(await fetchTextWithCache(cssUrl), cssUrl); // with originUrl
  }

  Array.from(snapshot_document.getElementsByTagName('style')).map(element => cssFragCollector.collect(getStyleElementCSSText(element), ''));
  const htmlFragOutput = htmlFragCollector.getOutput();
  const cssFragOutput = cssFragCollector.getOutput();
  {
    // reduce unused font files
    const fontFamilySet = new Set([...htmlFragOutput.fontInfo.fontFamilySet, ...cssFragOutput.fontInfo.fontFamilySet]);
    Object.entries({ ...htmlFragOutput.fontInfo.fontFaceMap,
      ...cssFragOutput.fontInfo.fontFaceMap
    }).forEach(([fontTag, urlInfoSet]) => {
       false && 0;
      if (!fontFamilySet.has(fontTag.split('|')[0])) return urlInfoSet.forEach(urlInfo => {
        urlInfo.isIgnore = true;
      }); // reduce font files
      // TODO: may break compatibility (do we have many?) // NOTE: prefer keep by: woff2, woff, or just the first one (ttf/otf maybe)

      let urlInfoWoff2 = null;
      let urlInfoWoff = null;
      urlInfoSet.forEach(urlInfo => {
        urlInfoWoff2 = urlInfoWoff2 || (urlInfo.urlString.includes('woff2') ? urlInfo : null);
        urlInfoWoff = urlInfoWoff || (urlInfo.urlString.includes('woff') ? urlInfo : null);
      }); // drop others

      let hasPickedFirst = false;
      urlInfoSet.forEach(urlInfo => {
        if (urlInfoWoff2 && urlInfo !== urlInfoWoff2) urlInfo.isIgnore = true;else if (urlInfoWoff && urlInfo !== urlInfoWoff) urlInfo.isIgnore = true;else {
          urlInfo.isIgnore = hasPickedFirst;
          hasPickedFirst = true;
        }
         false && 0;
      });
    });
  }
   false && 0;
  let htmlString, cssString, domString, svgString, svgDataUrl, imageElement, canvasElement, pngDataUrl;

  const packResult = () => ({
    htmlString,
    cssString,
    domString,
    svgString,
    svgDataUrl,
    imageElement,
    canvasElement,
    pngDataUrl
  });

  try {
    htmlString = await prepareHTMLString(await convertFragListWithUrlMap(htmlFragOutput));
    cssString = await prepareCSSString(await convertFragListWithUrlMap(cssFragOutput));
    domString = `${cssString}\n${htmlString}`;
    svgString = await prepareSVGString({
      domString,
      width,
      height
    }); // TODO: HACK: instead of a blobUrl, if we use a dataUrl, chrome seems happy...
    // ISSUE: https://bugs.chromium.org/p/chromium/issues/detail?id=294129
    // FIX DEMO: https://jsfiddle.net/2Lh24rg9/
    // TODO: CHECK: dataUrl Length Limit
    // https://stackoverflow.com/questions/695151/data-protocol-url-size-limitations
    // const blobUrl = URL.createObjectURL(new Blob([ svgString ], { type: 'image/svg+xml' }))

    svgDataUrl = `data:image/svg+xml;charset=utf8,${encodeURIComponent(svgString)}`;

    if (!skipHeavyRender) {
      const result = await renderPngDataUrlFromSvgDataUrl({
        svgDataUrl,
        width,
        height
      });
      imageElement = result.imageElement;
      canvasElement = result.canvasElement;
      pngDataUrl = result.pngDataUrl;
    }
  } catch (error) {
     false && 0;
  }

  return packResult();
};

const getStyleElementCSSText = element => {
  const {
    innerHTML
  } = element;
  if (innerHTML.length !== 0) return innerHTML; // in Chrome, styled-components will generate `empty` style tag and add style to `.sheet.cssRules`
  // use CSS Object Model (CSSOM) API

  const cssTextList = [];
  const {
    sheet: {
      cssRules
    }
  } = element;

  for (let index = 0, indexMax = cssRules.length; index < indexMax; index++) {
    const {
      cssText
    } = cssRules[index];
    cssTextList.push(cssText);
  }

  return cssTextList.join('\n');
};

const renderPngDataUrlFromSvgDataUrl = async ({
  svgDataUrl,
  width,
  height
}) => {
  const imageElement = await prepareImageElement({
    svgDataUrl,
    width,
    height
  });
  const canvasElement = await prepareCanvasElement({
    imageElement,
    width,
    height
  });
  const pngDataUrl = canvasElement.toDataURL();
  return {
    imageElement,
    canvasElement,
    pngDataUrl
  };
};


;// CONCATENATED MODULE: ./source/index.example.js









/******/ 	return __webpack_exports__;
/******/ })()
;
});