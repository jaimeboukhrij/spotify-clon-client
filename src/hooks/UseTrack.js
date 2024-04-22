import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getTrackInfo } from '../utils/getTrackInfo'
import { getArtistinfo } from '../utils/getArtistInfo'
import { getTracksRecomendations } from '../utils/getTracksRecomendations'
import { getArtistTopTrack } from '../utils/getArtistTopTrack'
import { getArtistAlbums } from '../utils/getArtistAlbums'
import { getRelatedArtist } from '../utils/getRelatedArtist'
import { useBgNav } from './UseBgNav'
import { GlobalVarContext } from '../contexts/globalVar.context'
import getDominantColorFromImage from '../utils/getDominantColorFromImage'

export const useTrack = () => {
  const [trackInfo, setTrackInfo] = useState()
  const [artistsData, setArtistsData] = useState(null)
  const [artistAlbums, setArtistAlbum] = useState()
  const [divWidth, setDivWidth] = useState()
  const [bgColor, setBgColor] = useState([])
  const { idTrack } = useParams()
  const outerDivName = 'containerTracks'
  const innerDivName = 'tracksOfTracks'
  useBgNav({ bgColor, outerDivName, innerDivName })
  const { setPageName } = useContext(GlobalVarContext)

  useEffect(() => {
    document.getElementById(outerDivName)?.scrollTo(0, 0)
    setBgColor()
    getTrackInfo(idTrack)
      .then(data => data)
      .then(prevRes => {
        getTracksRecomendations(idTrack).then(data => {
          prevRes.tracksRecomendations = data
          setTrackInfo(prevRes)
        })
      })
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
      setArtistsData(null)
    }
  }, [idTrack])
  useEffect(() => setPageName(trackInfo?.name), [trackInfo])

  useEffect(() => {
    if (trackInfo) {
      getArtistData(trackInfo)
      getDominantColorFromImage(trackInfo?.urlImg).then(data => {
        setBgColor([data])
      })
    }
  }, [trackInfo])

  useEffect(() => {
    if (artistsData?.length) {
      getArtistAlbums(artistsData[0].data.id)
        .then(data => setArtistAlbum(data))
        .catch(e => console.log(e))
    }
  }, [artistsData])
  async function getArtistData () {
    const artistDataPromises = trackInfo.owner.slice(0, 5).map(async owner => {
      const data = await getArtistinfo(owner[0])
      const topTracks = await getArtistTopTrack(owner[0])
      const relatedArtists = await getRelatedArtist(owner[0])
      let topAlbums = await getArtistAlbums(owner[0])
      topAlbums = [...topAlbums.album, ...topAlbums.single]
      const transformTopTracks = topTracks.map((elem) => {
        return {
          name: elem.trackName,
          duration: elem.duration,
          id: elem.trackId,
          isHover: false,
          album: elem.album,
          owner: elem.owner,
          urlImg: elem.urlImg
        }
      })
      return { data, topTracks: transformTopTracks, topAlbums, relatedArtists }
    })

    const artistData = await Promise.all(artistDataPromises)
    setArtistsData(artistData)
  }
  const setIsHoverTrack = (trackIndex, isHover) => {
    setTrackInfo(prevTracks => {
      const updatedTracks = { ...prevTracks }
      updatedTracks.tracksRecomendations[trackIndex] = { ...prevTracks.tracksRecomendations[trackIndex], isHover }
      return updatedTracks
    })
  }

  return {
    trackInfo,
    artistsData,
    setIsHoverTrack,
    artistAlbums,
    divWidth,
    bgColor,
    setBgColor
  }
}
