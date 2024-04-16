import newSpotifyService from '../services/spotify.service'

const getTracksFromPlayList = (idPlayList, setPlayLists) => {
  return newSpotifyService
    .getTracksFromPlayList(idPlayList)
    .then(({ data }) => {
      const idPlayListFilter = data.items.filter(elem => elem.track.preview_url)
      const allPlayList = idPlayListFilter.map((elem) => {
        return {
          trackName: elem.track.name,
          trackId: elem.track.id,
          artistTrack: elem.track.artists.map(elem => elem.name),
          artistTrackId: elem.track.artists.map(elem => elem.id),
          album: elem.track.album.name,
          albumId: elem.track.album.id,
          urlImg: elem.track.album?.images[0].url,
          duration: elem.track.duration_ms,
          date: elem.added_at,
          isHover: false,
          urlMp3: elem.track.preview_url
        }
      })
      return allPlayList
    })
    .catch(error => {
      console.error('Error fetching tracks:', error)
      return Promise.reject(error)
    })
}

export default getTracksFromPlayList
