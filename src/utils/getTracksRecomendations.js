import newSpotifyService from '../services/spotify.service'

export function getTracksRecomendations (idArtist) {
  return newSpotifyService.getTracksRecomendations(idArtist)
    .then(({ data }) => {
      const allData = data.tracks.sort((a, b) => b.popularity - a.popularity).slice(0, 5).map(elem => {
        return {
          name: elem.name,
          duration: elem.duration_ms,
          id: elem.id,
          isHover: false,
          owner: elem.artists.map(elem => ({ id: elem.id, name: elem.name })),
          urlImg: elem.album.images[0].url
        }
      })
      return allData
    })
    .catch(e => console.log(e))
}
