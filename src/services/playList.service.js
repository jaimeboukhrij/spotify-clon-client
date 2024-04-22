import axios from 'axios'

class PlayListService {
  constructor () {
    this.api = axios.create({
      baseURL: 'https://serverspotify.fly.dev/api/playList'
    })

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }

      return config
    })
  }

  savePlayList (data) {
    return this.api.put('/savePlayList', data)
  }

  createPlayList (data) {
    return this.api.post('createPlayList', data)
  }

  getMyPlayLists (userId) {
    return this.api.get(`getMyPlayLists/${userId}`)
  }

  getPlayListInfo (playListId) {
    return this.api.get(`getPlayListInfo/${playListId}`)
  }
}

const playListService = new PlayListService()

export default playListService
