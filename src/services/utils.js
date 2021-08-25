import crypto from 'crypto'
import dataUriToBuffer from 'data-uri-to-buffer'

const precision = 1000000

const utils = {
  buildHash: function (hashable) {
    return crypto.createHash('sha256').update(hashable).digest('hex')
  },
  toDecimals: function (amount, precision) {
    if (!precision) precision = 100
    if (!amount) return
    if (typeof amount === 'string') {
      amount = Number(amount)
    }
    return Math.round(amount * precision) / precision // amount.toFixed(2)
  },
  getFileExtension: function (filename, type) {
    if (filename && filename.lastIndexOf('.') > 0) {
      const index = filename.lastIndexOf('.')
      return filename.substring(index + 1).toLowerCase()
    } else if (type) {
      const index = type.lastIndexOf('/') + 1
      return '.' + type.substring(index).toLowerCase()
    }
  },
  getFileNameNoExtension: function (filename) {
    if (filename && filename.lastIndexOf('.') > 0) {
      const index = filename.lastIndexOf('.')
      return filename.substring(index + 1)
    }
    return ''
  },
  getTypeFromFileExtension: function (filename) {
    const extension = this.getFileNameNoExtension(filename)
    if (extension === 'mp4') {
      return 'video/mp4'
    }
    return ''
  },
  copyAddress: function (document, flasher, target) {
    const tempInput = document.createElement('input')
    tempInput.style = 'position: absolute; left: -1000px; top: -1000px'
    tempInput.value = target
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    flasher.classList.add('flasher')
    setTimeout(function () {
      flasher.classList.remove('flasher')
    }, 1000)
  },
  makeFlasher: function (flasher) {
    flasher.classList.add('flasher')
    setTimeout(function () {
      flasher.classList.remove('flasher')
      setTimeout(function () {
        flasher.classList.add('flasher')
        setTimeout(function () {
          flasher.classList.remove('flasher')
          setTimeout(function () {
            flasher.classList.add('flasher')
            setTimeout(function () {
              flasher.classList.remove('flasher')
            }, 300)
          }, 300)
        }, 300)
      }, 300)
    }, 300)
  },
  fromMicroAmount: function (amountMicroStx) {
    try {
      if (amountMicroStx === 0) return 0
      const val = Math.round(amountMicroStx) / (precision)
      return val
    } catch {
      return 0
    }
  },
  /**
  fromOnChainAmount: function (amountMicroStx) {
    try {
      amountMicroStx = parseInt(amountMicroStx, 16)
      if (typeof amountMicroStx === 'string') {
        amountMicroStx = Number(amountMicroStx)
      }
      if (amountMicroStx === 0) return 0
      amountMicroStx = amountMicroStx / precision
      return Math.round(amountMicroStx * precision) / precision
    } catch {
      return 0
    }
  },
  **/
  toOnChainAmount: function (amount) {
    try {
      amount = amount * precision
      return Math.round(amount * precision) / precision
    } catch {
      return 0
    }
  },
  audioToBase64: function (audioFile) {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest()
      request.open('GET', audioFile, true)
      request.responseType = 'blob'
      request.onload = function () {
        const reader = new FileReader()
        reader.readAsDataURL(request.response)
        reader.onload = function (e) {
          resolve(e.target.result)
        }
      }
      request.send()
    })
  },
  readFileChunks: function (fileUrl) {
    return new Promise((resolve) => {
      const myRequest = new Request(fileUrl)
      const fileObject = { fileUrl: fileUrl }
      fileObject.dataHash = ''
      // fetch returns a promise
      const $self = this
      fetch(myRequest).then((response) => {
        const contentLength = parseInt(response.headers.get('Content-Length'))
        // response.body is a readable stream
        // @link https://docs.microsoft.com/en-us/microsoft-edge/dev-guide/performance/streams-api
        const myReader = response.body.getReader()
        // the reader result will need to be decoded to text
        // @link https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder
        const decoder = new TextDecoder()
        // add decoded text to buffer for decoding
        let buffer = ''
        // you could use the number of bytes received to implement a progress indicator
        let received = 0
        // read() returns a promise
        myReader.read().then(function processResult (result) {
          // the result object contains two properties:
          // done  - true if the stream is finished
          // value - the data
          if (result.done) {
            fileObject.type = $self.getTypeFromFileExtension(fileUrl)
            fileObject.size = contentLength
            fileObject.received = received
            resolve(fileObject)
            return
          }
          // update the number of bytes received total
          received += result.value.length
          // result.value is a Uint8Array so it will need to be decoded
          // buffer the decoded text before processing it
          buffer = decoder.decode(result.value, { stream: true })
          // buffer += result.value
          /* process the buffer string */

          // read the next piece of the stream and process the result
          fileObject.dataHash = utils.buildHash(buffer + fileObject.dataHash)
          return myReader.read().then(processResult)
          /**
          myReader.read().then(() => {
            // processResult(result)
             * this is how to read the whole file - we'll just take the first chunk, hash it and save the fileUrl.
            if (received >= contentLength) {
              const type = $self.getTypeFromFileExtension(fileUrl)
              resolve({ fileUrl: fileUrl, type: type, size: contentLength, received: received })
            } else {
              processResult(result)
            }
          })
          **/
        })
      })
    })
  },
  fetchBase64FromImageUrl: function (url, document) {
    return new Promise((resolve) => {
      const img = new File()
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        const dataURL = canvas.toDataURL('image/png')
        const mimeType = dataURL.substring(dataURL.indexOf(':') + 1, dataURL.indexOf(';')) // => image/png
        const imageBuffer = dataUriToBuffer(dataURL)
        resolve({ dataURL: dataURL, imageBuffer: imageBuffer, mimeType: mimeType })
      }
      img.src = url
    })
  },
  readFileFromUrlToDataURL: function (url) {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.responseType = 'blob'
      request.onload = function () {
        const reader = new FileReader()
        reader.readAsDataURL(request.response)
        const file = {
          size: request.response.size,
          type: request.response.type
        }
        reader.onload = function (e) {
          file.dataUrl = e.target.result
          resolve(file)
        }
      }
      request.send()
    })
  },
  getBase64FromImageUrl: function (dataURL) {
    const imageBuffer = dataUriToBuffer(dataURL)
    // const rawImage = dataURL.replace(/^data:image\/(png|jpg);base64,/, '')
    const mimeType = dataURL.substring(dataURL.indexOf(':') + 1, dataURL.indexOf(';')) // => image/png
    return { imageBuffer: imageBuffer, mimeType: mimeType }
  },
  stringToHex: function (str) {
    const arr = []
    for (let i = 0; i < str.length; i++) {
      arr[i] = (str.charCodeAt(i).toString(16)).slice(-4)
    }
    return '0x' + arr.join('')
  }
}
export default utils
