/* eslint-disable camelcase */
import newSpotifyService from '../services/spotify.service'
import { globalsBG } from '../constants'

const getPlayListByGenre = (idGenre, setCategoryName, setPlayLists, limit) => {
  newSpotifyService
    .getPlayListByGenre(idGenre, limit)
    .then(({ data }) => {
      setCategoryName(data.message)
      const arr = data.playlists.items
      const deleteRepeatList = arr.filter((elem, index, array) => {
        return array.findIndex(item => item.id === elem.id) === index
      })
      const playlistsFilter = deleteRepeatList.map(({ name, description, id, primary_color, images }, index) => {
        return {
          name,
          description,
          id,
          color: globalsBG[index % globalsBG.length],
          urlImg: images[0].url
        }
      })
      setPlayLists(playlistsFilter)
    })
}
export default getPlayListByGenre
