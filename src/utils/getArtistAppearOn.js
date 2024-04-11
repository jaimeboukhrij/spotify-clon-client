import newSpotifyService from '../services/spotify.service'

export function getArtistAppearOn (idArtist) {
  return newSpotifyService
    .getArtistAppearsOn(idArtist)
    .then(({ data }) => {
      const arrData = data.items.map(elem => {
        return {
          id: elem.id,
          name: elem.name,
          description: `${elem.release_date.substring(0, 4)}·${elem.type}`,
          urlImg: elem.images[0].url
        }
      })
      return arrData
    })
    .catch(e => console.log(e))
}
