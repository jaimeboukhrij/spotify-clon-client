import { useContext, useEffect, useState } from 'react'
import { getAlbumInfo } from '../utils/getAlbumInfo'
import { useParams } from 'react-router'
import { getMoreofArtist } from '../utils/getMoreofArtist'
import { GlobalVarContext } from '../contexts/globalVar.context'
import { useBgNav } from './UseBgNav'
import getDominantColorFromImage from '../utils/getDominantColorFromImage'

export function useAlbum () {
  const [albumInfo, setAlbumInfo] = useState()
  const [albumTracks, setAlbumTracks] = useState()
  const [artistdiscography, setArtistdiscography] = useState()
  const [width, setDivWidth] = useState()
  const [bgColor, setBgColor] = useState()
  const { idAlbum } = useParams()
  const { setNavFilter } = useContext(GlobalVarContext)
  const outerDivName = 'albumContainer'
  const innerDivName = 'tracksOfAlbum'
  useBgNav({ bgColor, outerDivName, innerDivName })
  const { setPageName } = useContext(GlobalVarContext)

  useEffect(() => {
    setBgColor()
    setNavFilter('transparent')
    document.getElementById(outerDivName)?.scrollTo(0, 0)

    if (idAlbum) {
      getAlbumData()
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
  }, [idAlbum])
  useEffect(() => {
    if (albumInfo) {
      getArtistdiscography()
      setPageName(albumInfo?.name)
      getDominantColorFromImage(albumInfo?.urlImg).then(data => {
        setBgColor([data])
      })
    }
  }, [albumInfo])
  const setIsHoverTrack = (trackIndex, isHover) => {
    setAlbumTracks(prevTracks => {
      const updatedTracks = [...prevTracks]
      updatedTracks[trackIndex] = { ...prevTracks[trackIndex], isHover }
      return updatedTracks
    })
  }
  const getAlbumData = () => {
    getAlbumInfo(idAlbum)
      .then(data => {
        const tracks = data.tracks.map(elem => {
          return {
            trackId: elem.id,
            trackName: elem.name,
            artist: elem.artists.map(elem => ({ id: elem.id, name: elem.name })),
            duration: elem.duration_ms,
            urlMp3: elem.preview_url,
            isHover: false
          }
        })
        setAlbumInfo(data)
        setAlbumTracks(tracks)
      })
  }
  const getArtistdiscography = () => {
    getMoreofArtist(albumInfo.artist[0].id).then(data => setArtistdiscography(data)).catch(e => console.log(e))
  }

  return ({
    albumInfo,
    albumTracks,
    setIsHoverTrack,
    idAlbum,
    artistdiscography,
    width,
    bgColor,
    setBgColor
  })
}
