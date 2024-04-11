import axios from 'axios'

class SpotifyService {
  constructor () {
    const spotifyToken = localStorage.getItem('tokenSpotify')
    this.api = axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${spotifyToken}`
      }
    })
  }

  getAllCategorys (offset) {
    return this.api.get(`browse/categories?offset=${offset}&limit=50&locale=ES`)
  }

  getPlayListByGenre (idGenre, limit) {
    return this.api.get(`browse/categories/${idGenre}/playlists?locale=es-ES%2Ces%3Bq%3D0.9&limit=${limit}`)
  }

  getTracksFromPlayList (idPlayList) {
    return this.api.get(`playlists/${idPlayList}/tracks`)
  }

  getOnePlayListInfo (idPlayList) {
    return this.api.get(`playlists/${idPlayList}?market=ES`)
  }

  getOneCategoryInfo (categoryId) {
    return this.api.get(`browse/categories/${categoryId}?market=ES`)
  }

  getTrackInfo (idTrack) {
    return this.api.get(`tracks/${idTrack}`)
  }

  getArtistInfo (idArtist) {
    return this.api.get(`artists/${idArtist}?market=ES`)
  }

  getArtistTopTrack (idArtist) {
    return this.api.get(`artists/${idArtist}/top-tracks`)
  }

  getRelatedArtist (idArtist) {
    return this.api.get(`artists/${idArtist}/related-artists`)
  }

  getArtistAppearsOn (idArtist) {
    return this.api.get(`artists/${idArtist}/albums?include_groups=appears_on&limit=50&offset=0`)
  }

  getAlbumInfo (idAlbum) {
    return this.api.get(`albums/${idAlbum}`)
  }

  getTracksFromAlbum (idAlbum) {
    return this.api.get(`albums/${idAlbum}/tracks`)
  }

  getMoreofArtist (idArtist) {
    return this.api.get(`artists/${idArtist}/albums?include_groups=album%2Csingle%2Ccompilation&limit=50&offset=0`)
  }

  getQuerySearched (query) {
    return this.api.get(`search?q=${query}&type=album%2Cplaylist%2Cartist%2Ctrack`)
  }

  getTracksRecomendations (idTrack) {
    return this.api.get(`recommendations?seed_tracks=${idTrack}`)
  }

  getArtistsAlbums (idArtist) {
    return this.api.get(`artists/${idArtist}/albums?include_groups=album%2Csingle%2Ccompilation`)
  }
}
const newSpotifyService = new SpotifyService()
export default newSpotifyService
