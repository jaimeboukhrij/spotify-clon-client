import newSpotifyService from '../services/spotify.service'

export function getAlbumInfo (idAlbum) {
  return newSpotifyService
    .getAlbumInfo(idAlbum)
    .then(({ data }) => {
      return {
        id: data.id,
        urlImg: data.images[0].url,
        name: data.name,
        type: data.album_type,
        artist: data.artists.map(elem => ({ id: elem.id, name: elem.name })),
        date: data.release_date,
        copyRights: data.copyrights[0].text,
        tracks: data.tracks.items

      }
    })
    .catch(e => console.log(e))
}
