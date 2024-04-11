import newSpotifyService from '../services/spotify.service'

export function getArtistTopTrack (idArtist) {
  return newSpotifyService
    .getArtistTopTrack(idArtist)
    .then(({ data }) => {
      const dataFilter = data.tracks.filter(elem => elem.preview_url)
      const arrData = dataFilter.map(elem => {
        return ({
          trackName: elem.name,
          trackId: elem.id,
          album: [
            elem.album.name,
            elem.album.id
          ],
          owner: elem.artists.map(elem => ({ id: elem.id, name: elem.name })),
          urlImg: elem.album?.images[0].url,
          duration: elem.duration_ms,
          isHover: false,
          urlMp3: elem.preview_url

        })
      })

      return arrData
    })
    .catch(e => console.log(e))
}
