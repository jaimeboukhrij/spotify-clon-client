import newSpotifyService from '../services/spotify.service'

const getPlayListInfo = (idPlayList, setPlayListInfo) => {
  return newSpotifyService
    .getOnePlayListInfo(idPlayList)
    .then(({ data }) => {
      const info =
       {
         id: data.id,
         description: data.description,
         likes: data.followers.total,
         name: data.name,
         urlImg: data.images[0].url,
         owner: data.owner.display_name,
         tracksLength: data.tracks.items.length,
         duration: data.tracks.items.reduce((acc, item) => acc + item.track.duration_ms, 0),
         idArtists: data.tracks.items.map(elem => elem.track.artists.map(elem => elem.id))
       }

      setPlayListInfo && setPlayListInfo(info)
      return info
    })
    .catch(e => console.log(e))
}

export default getPlayListInfo
