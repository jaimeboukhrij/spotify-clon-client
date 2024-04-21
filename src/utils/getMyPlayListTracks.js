import playListService from '../services/playList.service'

export function getMyPlayListTracks (idPlayList) {
  return playListService.getPlayListInfo(idPlayList)
    .then(({ data }) => data.tracks)
    .catch(e => console.log(e))
}
