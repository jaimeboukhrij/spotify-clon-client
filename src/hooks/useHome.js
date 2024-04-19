import { useContext, useEffect, useState } from 'react'
import { idRecomPlayList, idPopularRadios } from '../constants'
import getPlayListInfo from '../utils/getPlayListInfo'
import userService from '../services/user.services'
import { AuthContext } from '../contexts/auth.context'
export function useHome () {
  const [playListInfo, setPlayListInfo] = useState([])
  const [favouriteArtists, setFavouritesArtists] = useState([])
  const [radios, setRadios] = useState([])
  const [divWidth, setDivWidth] = useState()
  const [recentListened, setRecentListened] = useState([])
  const [imgColor, setImgColor] = useState()
  const [bgColor, setBgColor] = useState(['gray'])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      getPlayListData(idRecomPlayList, setPlayListInfo)
      getPlayListData(idPopularRadios, setRadios)
      getFavouriteArtists()
      getRecentListened()
    }

    function handleResize () {
      const artistRef = document.getElementById('main')
      if (artistRef) {
        setDivWidth(artistRef.clientWidth)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [user])

  async function getPlayListData (list, state) {
    const allData = list.map(async elem => {
      const data = await getPlayListInfo(elem)
      return data
    })
    const fetchInfo = await Promise.all(allData)
    state(fetchInfo)
  }
  const getFavouriteArtists = () => {
    const userId = user._id
    userService.getFavouriteArtists(userId)
      .then(({ data }) => setFavouritesArtists(data))
      .catch(e => console.log(e))
  }
  const getRecentListened = () => {
    const userId = user._id
    userService.getrecentyListened(userId)
      .then(({ data }) => setRecentListened(data))
      .catch(e => console.log(e))
  }
  return {
    playListInfo,
    divWidth,
    favouriteArtists,
    radios,
    recentListened,
    imgColor,
    setImgColor,
    bgColor,
    setBgColor
  }
}
