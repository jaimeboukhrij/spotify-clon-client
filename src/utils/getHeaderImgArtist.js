import axios from 'axios'

export async function getHeaderImgArtis (idArtist) {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/artist_overview/',
    params: {
      id: idArtist
    },
    headers: {
      'X-RapidAPI-Key': '8ccb704bd1mshe543da27b9cee74p1270bdjsn2c0ce9ef22dd',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options)
    const headerImageUrl = response.data.data.artist.visuals.headerImage.sources[0].url
    return headerImageUrl
  } catch (error) {
    console.error(error)
    return null
  }
}
