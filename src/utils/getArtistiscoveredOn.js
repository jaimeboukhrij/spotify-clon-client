import axios from 'axios'

export async function getArtistiscoveredOn (idArtist) {
  const options = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/artist_discovered_on/',
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
    const arrData = response.data.data.artist.relatedContent.discoveredOn.items.map(elem => {
      return {
        description: elem.description,
        id: elem.id,
        name: elem.name,
        urlImg: elem.images.items[0].sources[0].url
      }
    })
    return arrData
  } catch (error) {
    console.error(error)
    return null
  }
}
