import axios from 'axios'

export async function getHeaderImgArtis (idArtist) {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/artist_overview/',
    params: {
      id: idArtist
    },
    headers: {
      'X-RapidAPI-Key': 'd06e30e105mshadd8ddf94f9f185p133fb2jsn121b18afb4c8',
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
