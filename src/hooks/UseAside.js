import { useEffect, useState, useContext } from 'react'
import userService from '../services/user.services'
import { AuthContext } from '../contexts/auth.context'
import { TrackPlayingContext } from '../contexts/trackPlaying'
import playListService from '../services/playList.service'
import { useNavigate } from 'react-router-dom'
import { GlobalVarContext } from '../contexts/globalVar.context'

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
  const [myPlayLists, setMyPlayLists] = useState([])
  const [query, setQuery] = useState('')
  const { user } = useContext(AuthContext)
  const { isPlaying, trackPlaying, audioPlayer } = useContext(TrackPlayingContext)
  const { changeMyPlayLis } = useContext(GlobalVarContext)
  const navigate = useNavigate()

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
      getMyPlayLists()
    }
  }, [user, isPlaying, trackPlaying, audioPlayer, changeMyPlayLis])
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
  const createPlayList = () => {
    if (user) {
      playListService.createPlayList({ userId: user._id, length: myPlayLists.length })
        .then(({ data }) => {
          const id = data._id.toString()
          setMyPlayLists(prev => [...prev, data])
          navigate(`/myplaylist/${id}`)
        })
        .catch(e => console.log(e))
    }
  }
  const getMyPlayLists = () => {
    playListService.getMyPlayLists(user._id).then(({ data }) => setMyPlayLists(data))
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
    query,
    createPlayList,
    myPlayLists
  }
}
