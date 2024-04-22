import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getArtistinfo } from '../utils/getArtistInfo'
import { getHeaderImgArtis } from '../utils/getHeaderImgArtist'
import { getArtistTopTrack } from '../utils/getArtistTopTrack'
import { getRelatedArtist } from '../utils/getRelatedArtist'
import { getArtistAppearOn } from '../utils/getArtistAppearOn'
import { getArtistFeaturing } from '../utils/getArtistFeaturing'
import { getArtistiscoveredOn } from '../utils/getArtistiscoveredOn'
import { useBgNav } from './UseBgNav'
import { GlobalVarContext } from '../contexts/globalVar.context'
import userService from '../services/user.services'
import { AuthContext } from '../contexts/auth.context'

export function useArtist () {
  const { idArtist } = useParams()
  const [artist, setArtist] = useState()
  const [headerInfo, setHeaderInfo] = useState()
  const [divWidth, setDivWidth] = useState()
  const [bgColor, setBgColor] = useState()
  const [followingArtist, setFollowingArtist] = useState(false)
  const outerDivName = 'containerArtist'
  const innerDivName = 'tracksArtist'
  useBgNav({ bgColor, outerDivName, innerDivName })
  const { setPageName } = useContext(GlobalVarContext)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    document.getElementById(outerDivName)?.scrollTo(0, 0)
    setBgColor()
    setArtist()
    setHeaderInfo()
  }, [idArtist])
  useEffect(() => {
    setPageName(artist?.name)
  }, [artist, idArtist])

  useEffect(() => {
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
  }, [artist, idArtist])

  useEffect(() => {
    const fetchHeaderInfo = async () => {
      try {
        const artistMainInfo = await getArtistinfo(idArtist)
        const headerImage = await getHeaderImgArtis(idArtist)
        const headerInfo = { ...artistMainInfo, headerImage }
        setHeaderInfo(headerInfo)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchData = async () => {
      try {
        const topTracks = await getArtistTopTrack(idArtist)
        const relatedArtist = await getRelatedArtist(idArtist)
        const artistAppearsOn = await getArtistAppearOn(idArtist)
        const artistFeaturing = await getArtistFeaturing(idArtist)
        const artistDiscoveredOn = await getArtistiscoveredOn(idArtist)
        const additionalInfo = {
          topTracks,
          relatedArtist,
          artistAppearsOn,
          artistFeaturing,
          artistDiscoveredOn
        }

        setArtist(additionalInfo)
      } catch (error) {
        console.error(error)
      }
    }
    const cachedArtistInfo = localStorage.getItem(`artist_${idArtist}`)
    if (cachedArtistInfo) {
      const parsedInfo = JSON.parse(cachedArtistInfo)
      setArtist(parsedInfo)
      setHeaderInfo({
        headerImage: parsedInfo.headerImage,
        followers: parsedInfo.followers,
        genres: parsedInfo.genres,
        id: parsedInfo.id,
        name: parsedInfo.name
      })
    } else {
      fetchHeaderInfo()
      fetchData()
    }
  }, [idArtist])

  useEffect(() => {
    const artistInfo = {
      ...artist,
      ...headerInfo
    }
    artistInfo && localStorage.setItem(`artist_${idArtist}`, JSON.stringify(artistInfo))
  }, [artist])

  useEffect(() => {
    if (user) {
      const userId = user._id
      userService.getFavouriteArtists(userId).then(({ data }) => {
        const filterData = data.some(elem => elem.id === idArtist)
        setFollowingArtist(filterData)
      }
      )
    }
  }, [user])

  const setIsHoverTrack = (trackIndex, isHover) => {
    setArtist((prevTracks) => {
      const updatedTracks = [...prevTracks.topTracks]
      updatedTracks[trackIndex] = { ...prevTracks.topTracks[trackIndex], isHover }
      return { ...prevTracks, topTracks: updatedTracks }
    })
  }
  const saveFavourtieArtist = () => {
    if (user) {
      setFollowingArtist(!followingArtist)
      const userId = user._id
      userService.saveFavouriteArtist({ idArtist, headerInfo, userId, artist }).catch(e => console.log(e))
    }
  }

  return {
    artist,
    setIsHoverTrack,
    divWidth,
    idArtist,
    setBgColor,
    bgColor,
    headerInfo,
    saveFavourtieArtist,
    followingArtist
  }
}
