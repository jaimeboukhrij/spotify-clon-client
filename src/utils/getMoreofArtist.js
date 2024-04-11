import newSpotifyService from '../services/spotify.service'

export function getMoreofArtist (idArtist) {
  return newSpotifyService
    .getMoreofArtist(idArtist)
    .then(({ data }) => {
      const allData = data.items.map(elem => {
        return {
          id: elem.id,
          name: elem.name,
          urlImg: elem.images[0].url,
          description: elem.release_date.substring(0, 4)
        }
      })
      return allData
    })
    .catch(e => console.log(e))
}
