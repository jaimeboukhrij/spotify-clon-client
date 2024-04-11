import newSpotifyService from '../services/spotify.service'

const getTracksFromAlbum = (idPlayList, setPlayLists) => {
  return newSpotifyService
    .getTracksFromAlbum(idPlayList)
    .then(({ data }) => {
      const idPlayListFilter = data.items.filter(elem => elem.preview_url)
      const allPlayList = idPlayListFilter.map((elem) => {
        return {
          trackName: elem.name,
          trackId: elem.id,
          artistTrack: elem.artists.map(elem => elem.name),
          artistTrackId: elem.artists.map(elem => elem.id),
          duration: elem.duration_ms,
          isHover: false,
          urlMp3: elem.preview_url
        }
      })
      return allPlayList
    })
    .catch(error => {
      console.error('Error fetching tracks:', error)
      return Promise.reject(error)
    })
}

export default getTracksFromAlbum
