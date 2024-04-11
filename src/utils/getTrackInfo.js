import newSpotifyService from '../services/spotify.service'

export const getTrackInfo = (id, setState) => {
  return newSpotifyService.getTrackInfo(id)
    .then(({ data }) => {
      const trackInfo = {
        name: data.name,
        owner: data.artists.map(ele => ([ele.id, ele.name])),
        date: data.album.release_date,
        likes: data.popularity,
        urlImg: data.album.images[0].url,
        duration: data.duration_ms,
        album: [
          data.album.id,
          data.album.name
        ],
        id,
        urlTrack: data.preview_url
      }
      setState && setState(trackInfo)
      return trackInfo
    })
    .catch(e => console.log(e))
}
