async function uploadPhoto (file) {
  const cloudName = 'djpeqlbo6'
  const uploadPreset = 'ysg6er97'
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error)
    throw error
  }
}
export default uploadPhoto
