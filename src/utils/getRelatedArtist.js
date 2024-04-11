import newSpotifyService from '../services/spotify.service'

export function getRelatedArtist (idArtist) {
  return (
    newSpotifyService
      .getRelatedArtist(idArtist)
      .then(({ data }) => {
        const dataArr = data.artists.map(elem => {
          return {
            id: elem.id,
            name: elem.name,
            urlImg: elem.images[0].url
          }
        })
        return dataArr
      })
  )
}
