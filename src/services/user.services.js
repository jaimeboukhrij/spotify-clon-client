import axios from 'axios'

class UserService {
  constructor () {
    this.api = axios.create({
      baseURL: 'https://serverspotify.fly.dev/api/user'
    })

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken')

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }

      return config
    })
  }

  AddrecentyListened (data) {
    return this.api.put('/recentyListened', data)
  }

  getrecentyListened (userId) {
    return this.api.get(`/recentyListened/${userId}`)
  }

  saveFavouriteArtist (data) {
    return this.api.put('/favouriteArtist', data)
  }

  getFavouriteArtists (userId) {
    return this.api.get(`/favouriteArtist/${userId}`)
  }
}

const userService = new UserService()

export default userService
