import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import getTracksFromPlayList from '../utils/getTracksFromPlayList'
import getPlayListInfo from '../utils/getPlayListInfo'
import { TrackPlayingContext } from '../contexts/trackPlaying'
import { useBgNav } from './UseBgNav'
import { GlobalVarContext } from '../contexts/globalVar.context'

export function UsePlayList () {
  const [tracks, setTracks] = useState([])
  const [playListInfo, setPlayListInfo] = useState([])
  const [bgColor, setBgColor] = useState([])
  const { idPlayList } = useParams()
  const { updateTrackPlaying } = useContext(TrackPlayingContext)
  const outerDivName = 'playListSection'
  const innerDivName = 'allTracksContainer'
  useBgNav({ bgColor, outerDivName, innerDivName })
  const { setPageName } = useContext(GlobalVarContext)

  useEffect(() => {
    document.getElementById(outerDivName)?.scrollTo(0, 0)
    getTracksFromPlayList(idPlayList).then(data => setTracks(data))
    getPlayListInfo(idPlayList, setPlayListInfo)
  }, [idPlayList])

  useEffect(() => setPageName(playListInfo.name), [playListInfo])

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
