import newSpotifyService from '../services/spotify.service'
import { getArtistAppearOn } from './getArtistAppearOn'

export function getQuerySearched (query) {
  return newSpotifyService
    .getQuerySearched(query)
    .then(({ data }) => {
      const albums = data.albums.items.slice(0, 10).map(elem => ({
        id: elem.id,
        name: elem.name,
        urlImg: elem.images[0]?.url,
        description: elem.artists[0].name,
        isHover: false
      }))

      const artists = data.artists.items.slice(0, 10).map(elem => ({
        id: elem.id,
        name: elem.name,
        urlImg: elem.images[0]?.url,
        description: elem.type,
        isHover: false
      }))

      const playLists = data.playlists.items.slice(0, 10).map(elem => ({
        id: elem.id,
        name: elem.name,
        urlImg: elem.images[0]?.url,
        description: elem.owner.display_name,
        isHover: false
      }))

      const tracksMap = data.tracks.items.map(elem => ({
        id: elem.id,
        name: elem.name,
        owner: elem.artists.map(artist => ({ id: artist.id, name: artist.name })),
        urlImg: elem.album.images[0]?.url,
        duration: elem.duration_ms,
        urlTrack: elem.preview_url,
        isHover: false
      }))
      const tracks = tracksMap.filter(elem => elem.urlTrack)
      return { albums, artists, playLists, tracks }
    })
    .then(firstData => {
      return getArtistAppearOn(firstData.artists[0].id).then((data) => {
        firstData.appearOn = data
        return firstData
      })
    })
    .catch(e => console.log(e))
}
