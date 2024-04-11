import { useEffect, useState, useContext } from 'react'
import userService from '../services/user.services'
import { AuthContext } from '../contexts/auth.context'
import { TrackPlayingContext } from '../contexts/trackPlaying'

export function UseAside () {
  const [spanHover, setSpanHover] = useState({
    home: false,
    search: false,
    tag: false,
    plus: false,
    arrow: false
  })
  const [isVisibleInput, setIsVisibleInput] = useState(false)
  const [recentlyListened, setRecentlyListened] = useState([])
  const { user } = useContext(AuthContext)
  const { isPlaying, trackPlaying } = useContext(TrackPlayingContext)

  useEffect(() => {
    if (user) {
      const userId = user._id
      userService.getrecentyListened(userId)
        .then(({ data }) => {
          const allData = data.map(({ id, name, typeMusic, urlImg }) => ({
            id,
            name,
            typeMusic,
            urlImg

          }))
          setRecentlyListened(allData)
        })
        .catch(e => console.log(e))
    }
  }, [user, isPlaying, trackPlaying])

  return { setSpanHover, spanHover, isVisibleInput, setIsVisibleInput, recentlyListened }
}
