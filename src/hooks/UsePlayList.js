import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import getTracksFromPlayList from '../utils/getTracksFromPlayList'
import getPlayListInfo from '../utils/getPlayListInfo'
import { GlobalVarContext } from '../contexts/globalVar.context'
import { TrackPlayingContext } from '../contexts/trackPlaying'

export function UsePlayList (changeNavColor) {
  const [tracks, setTracks] = useState([])
  const [playListInfo, setPlayListInfo] = useState([])
  const [bgColor, setBgColor] = useState([])
  const { idPlayList } = useParams()
  const { setPageName, setNavFilter } = useContext(GlobalVarContext)
  const { updateTrackPlaying } = useContext(TrackPlayingContext)

  useEffect(() => {
    changeNavColor('transparent')
    getTracksFromPlayList(idPlayList).then(data => setTracks(data))
    getPlayListInfo(idPlayList, setPlayListInfo)
    const container = document.getElementById('playListSection')
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)
      changeNavColor('#121212')
    }
  }, [bgColor, idPlayList])

  const handleScroll = () => {
    const outerDiv = document.getElementById('playListSection')
    const innerDiv = document.getElementById('allTracksContainer')

    if (!outerDiv || !innerDiv) return
    const outerDivRect = outerDiv.getBoundingClientRect()
    const innerDivRect = innerDiv.getBoundingClientRect()

    if (
      innerDivRect.top >= outerDivRect.top + 60
    ) {
      changeNavColor('transparent')
      setNavFilter(false)
    } else {
      bgColor && changeNavColor(bgColor[0])
      setPageName(playListInfo.name)
      setNavFilter(true)
    }
  }
  const setIsHoverTrack = (trackIndex, isHover) => {
    setTracks(prevTracks => {
      const updatedTracks = [...prevTracks]
      updatedTracks[trackIndex] = { ...prevTracks[trackIndex], isHover }
      return updatedTracks
    })
  }
  return {
    tracks,
    playListInfo,
    setIsHoverTrack,
    bgColor,
    setBgColor,
    updateTrackPlaying,
    idPlayList
  }
}
