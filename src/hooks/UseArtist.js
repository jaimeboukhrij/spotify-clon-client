import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getArtistinfo } from '../utils/getArtistInfo'
import { getHeaderImgArtis } from '../utils/getHeaderImgArtist'
import { getArtistTopTrack } from '../utils/getArtistTopTrack'
import { getRelatedArtist } from '../utils/getRelatedArtist'
import { getArtistAppearOn } from '../utils/getArtistAppearOn'
import { getArtistFeaturing } from '../utils/getArtistFeaturing'
import { getArtistiscoveredOn } from '../utils/getArtistiscoveredOn'

export function useArtist (changeNavColor) {
  const [artist, setArtist] = useState()
  const { idArtist } = useParams()
  const [divWidth, setDivWidth] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    changeNavColor('transparent')

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
    const storedArtistInfo = localStorage.getItem(`artist_${idArtist}`)
    if (storedArtistInfo) {
      setArtist(() => JSON.parse(storedArtistInfo))
      setLoading(false)
    } else {
      fetchData()
    }
  }, [idArtist])

  async function fetchData () {
    try {
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
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const setIsHoverTrack = (trackIndex, isHover) => {
    setArtist(prevTracks => {
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
    idArtist
  }
}
