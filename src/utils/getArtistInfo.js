import newSpotifyService from '../services/spotify.service'

export const getArtistinfo = (id, setState) => {
  return newSpotifyService.getArtistInfo(id)
    .then(({ data }) => {
      setState && setState(() => ({
        urlImg: data.images[0].url
      }))
      return {
        id: data.id,
        name: data.name,
        imgUrl: data.images[0].url,
        followers: data.followers.total,
        genres: data.genres
      }
    })
    . catch(e => console.log(e))
}
