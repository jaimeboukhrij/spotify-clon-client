/* eslint-disable array-callback-return */
import newSpotifyService from '../services/spotify.service'

export function getArtistAlbums (idArtist) {
  return newSpotifyService
    .getArtistsAlbums(idArtist)
    .then(({ data }) => {
      const singleArrFilter = data.items.filter(elem => elem.album_type === 'single')
      const albumArrFilter = data.items.filter(elem => elem.album_type === 'album')
      const single = singleArrFilter?.map(elem => {
        if (elem.album_type === 'single') {
          return {
            id: elem.id,
            name: elem.name,
            urlImg: elem.images[0].url,
            description: elem.artists[0].name
          }
        }
      })
      const album = albumArrFilter.map(elem => {
        if (elem.album_type === 'album') {
          return {
            id: elem.id,
            name: elem.name,
            urlImg: elem.images[0].url,
            description: elem.artists[0].name
          }
        }
      })
      return {
        single, album
      }
    })
    .catch(e => console.log(e))
}
