const { Blob, URL } = window

const createDownloadUrl = (fileName, dataUrl) => {
  const anchorElement = document.createElement('a')
  anchorElement.setAttribute('href', dataUrl)
  anchorElement.setAttribute('download', fileName)
  document.body.appendChild(anchorElement) // for Firefox
  anchorElement.click()
  document.body.removeChild(anchorElement)
}

const createDownloadBlob = (fileName, data) => {
  const blob = new Blob(data)
  const objectUrl = URL.createObjectURL(blob)
  createDownloadUrl(fileName, objectUrl)
  URL.revokeObjectURL(objectUrl)
}

export { createDownloadUrl, createDownloadBlob }
