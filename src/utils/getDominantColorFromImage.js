/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
export default async function getDominantColorFromImage (url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const darkVibrantColor = getDarkVibrantColor(imageData)
      resolve(rgbToHex(darkVibrantColor[0], darkVibrantColor[1], darkVibrantColor[2]))
    }
    // img.onerror = function (error) {
    //   reject(error)
    // }
    img.src = url
  })
}

function getDarkVibrantColor (imageData) {
  const data = imageData.data
  const colorMap = {}

  // Iterar sobre los píxeles y calcular la cantidad de cada color
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const hsl = rgbToHsl(r, g, b)

    // Filtrar los colores oscuros y vibrantes
    if (hsl[2] > 20 && hsl[2] < 80 && hsl[1] > 30) {
      const key = [r, g, b].toString()
      colorMap[key] = (colorMap[key] || 0) + 1
    }
  }

  // Encontrar el color más común entre los colores oscuros y vibrantes
  let maxColor = [0, 0, 0]
  let maxCount = 0
  for (const key in colorMap) {
    const count = colorMap[key]
    if (count > maxCount) {
      maxColor = key.split(',').map(Number)
      maxCount = count
    }
  }

  return maxColor
}

function rgbToHsl (r, g, b) {
  r /= 255, g /= 255, b /= 255
  const max = Math.max(r, g, b); const min = Math.min(r, g, b)
  let h; let s; const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

function rgbToHex (r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
