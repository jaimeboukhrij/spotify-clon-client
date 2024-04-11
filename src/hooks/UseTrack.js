import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getTrackInfo } from '../utils/getTrackInfo'
import { getArtistinfo } from '../utils/getArtistInfo'
import { getTracksRecomendations } from '../utils/getTracksRecomendations'
import { getArtistTopTrack } from '../utils/getArtistTopTrack'
import { getArtistAlbums } from '../utils/getArtistAlbums'

export const useTrack = () => {
  const [trackInfo, setTrackInfo] = useState()
  const [artistsData, setArtistsData] = useState(null)
  const [artistAlbums, setArtistAlbum] = useState()
  const [divWidth, setDivWidth] = useState()
  const { idTrack } = useParams()

  useEffect(() => {
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
    }
  }, [idTrack])

  useEffect(() => {
    if (trackInfo) {
      getArtistData(trackInfo)
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
      return { data, topTracks: transformTopTracks, topAlbums }
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
    divWidth
  }
}
