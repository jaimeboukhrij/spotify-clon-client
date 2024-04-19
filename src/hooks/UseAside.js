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
  const [filterListened, setFilterListened] = useState([])
  const [filterType, setFilterType] = useState(null)
  const [query, setQuery] = useState('')
  const { user } = useContext(AuthContext)
  const { isPlaying, trackPlaying, audioPlayer } = useContext(TrackPlayingContext)

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
  }, [user, isPlaying, trackPlaying, audioPlayer])
  useEffect(() => {
    filterRecentListened(filterType)
  }, [query])

  const filterRecentListened = (type) => {
    setFilterType(type)

    const data = recentlyListened.filter(elem => {
      const lowercasedQuery = query ? query.toLowerCase() : ''

      if (type && !query) {
        return elem.typeMusic === type
      } else if (!type && query) {
        const stringElem = elem.name.toLowerCase()
        return stringElem.includes(lowercasedQuery)
      } else if (type && query) {
        const stringElem = elem.name.toLowerCase()
        return elem.typeMusic === type && stringElem.includes(lowercasedQuery)
      } else {
        return true // No hay filtro aplicado
      }
    })

    setFilterListened(data)
  }

  return {
    setSpanHover,
    spanHover,
    isVisibleInput,
    setIsVisibleInput,
    recentlyListened,
    filterListened,
    filterRecentListened,
    filterType,
    setQuery,
    query
  }
}
