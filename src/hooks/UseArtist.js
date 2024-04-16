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

export function useArtist () {
  const { idArtist } = useParams()
  const [artist, setArtist] = useState()
  const [divWidth, setDivWidth] = useState()
  const [loading, setLoading] = useState(true)
  const [bgColor, setBgColor] = useState()

  const outerDivName = 'containerArtist'
  const innerDivName = 'tracksArtist'
  useBgNav({ bgColor, outerDivName, innerDivName })
  const { setPageName } = useContext(GlobalVarContext)

  useEffect(() => {
    document.getElementById(outerDivName)?.scrollTo(0, 0)
  }, [idArtist])
  useEffect(() => {
    setPageName(artist?.name)
  }, [artist])

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
    setLoading(true)

    const fetchData = async () => {
      try {
        const cachedArtistInfo = localStorage.getItem(`artist_${idArtist}`)
        if (cachedArtistInfo) {
          setArtist(JSON.parse(cachedArtistInfo))
        } else {
          const artistMainInfo = await getArtistinfo(idArtist)
          const headerImage = await getHeaderImgArtis(idArtist)
          const topTracks = await getArtistTopTrack(idArtist)
          const relatedArtist = await getRelatedArtist(idArtist)
          const artistAppearsOn = await getArtistAppearOn(idArtist)
          const artistFeaturing = await getArtistFeaturing(idArtist)
          const artistDiscoveredOn = await getArtistiscoveredOn(idArtist)
          const artistInfo = {
            ...artistMainInfo,
            headerImage,
            topTracks,
            relatedArtist,
            artistAppearsOn,
            artistFeaturing,
            artistDiscoveredOn
          }
          setArtist(artistInfo)
          localStorage.setItem(`artist_${idArtist}`, JSON.stringify(artistInfo))
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [idArtist])

  const setIsHoverTrack = (trackIndex, isHover) => {
    setArtist((prevTracks) => {
      const updatedTracks = [...prevTracks.topTracks]
      updatedTracks[trackIndex] = { ...prevTracks.topTracks[trackIndex], isHover }
      return { ...prevTracks, topTracks: updatedTracks }
    })
  }

  return {
    artist,
    setIsHoverTrack,
    divWidth,
    loading,
    idArtist,
    setBgColor,
    bgColor
  }
}
