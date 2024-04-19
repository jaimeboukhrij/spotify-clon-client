import { createContext, useContext, useEffect, useState } from 'react'
import getTracksFromPlayList from '../utils/getTracksFromPlayList'
import { getArtistTopTrack } from '../utils/getArtistTopTrack'
import { getTrackInfo } from '../utils/getTrackInfo'
import userService from '../services/user.services'
import { AuthContext } from './auth.context'
import getTracksFromAlbum from '../utils/getTracksFromAlbum'
import getPlayListInfo from '../utils/getPlayListInfo'

export const TrackPlayingContext = createContext()

export function TrackPlayProviderWrapper ({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [audioPlayer, setAudioPlayer] = useState(new Audio())
  const [isPlaying, setIsPlaying] = useState(false)
  const [idPlayList, setIdPlayList] = useState()
  const [idArtist, setIdArtist] = useState()
  const [idAlbum, setIdAlbum] = useState()
  // const [playOneTrack, setPlayOneTrack] = useState()
  const [volume, setVolumeTrack] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [typeMusic, setTypeMusic] = useState()
  const [trackPlaying, setTrackPlaying] = useState()
  const { user } = useContext(AuthContext)
  const updateTrackPlaying = (idTrack, index, type, idArtist) => {
    if (type) { setTypeMusic(type) }
    if (idArtist) { setIdArtist(idArtist) }
    getTrackInfo(idTrack, setTrackPlaying)
  }

  useEffect(() => {
    trackPlaying && runTrack()
    audioPlayer.addEventListener('ended', handleAudioEnded)
    audioPlayer.addEventListener('loadedmetadata', handleLoadedMetadata)
    audioPlayer.addEventListener('timeupdate', handleTimeUpdate)
    trackPlaying && saveRecentlyListended()
    return () => {
      audioPlayer.removeEventListener('ended', handleAudioEnded)
      audioPlayer.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audioPlayer.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [trackPlaying])

  const runTrack = () => {
    if (trackPlaying) {
      if (audioPlayer.src === trackPlaying.urlTrack) {
        if (isPlaying) {
          audioPlayer.pause()
          setIsPlaying(false)
        } else {
          audioPlayer.play()
          setIsPlaying(true)
        }
      } else {
        audioPlayer.src = trackPlaying.urlTrack
        audioPlayer.currentTime = 0
        audioPlayer.play()
        setIsPlaying(true)
      }
    }
  }

  const handleAudioEnded = () => {
    if (typeMusic === 'oneTrack') {
      audioPlayer.pause()
      setIsPlaying(false)
    } else {
      runNextTrack()
    }
  }
  const runNextTrack = () => {
    let getInfo
    if (typeMusic === 'artist') {
      getInfo = getArtistTopTrack(idArtist)
    } else if (typeMusic === 'playlist') {
      getInfo = getTracksFromPlayList(idPlayList)
    } else if (typeMusic === 'album') {
      getInfo = getTracksFromAlbum(idAlbum)
    }
    getInfo.then((data) => {
      const index = data.findIndex((obj) => obj.trackId === trackPlaying.id) + 1
      index <= data.length - 1
        ? updateTrackPlaying(data[index].trackId)
        : updateTrackPlaying(data[0].trackId)
    })
  }

  const runPrevTrack = () => {
    let getInfo
    if (typeMusic === 'artist') {
      getInfo = getArtistTopTrack(idArtist)
    } else if (typeMusic === 'playlist') {
      getInfo = getTracksFromPlayList(idPlayList)
    } else if (typeMusic === 'album') {
      getInfo = getTracksFromAlbum(idAlbum)
    }
    getInfo.then((data) => {
      const index = data.findIndex((obj) => obj.trackId === trackPlaying.id) - 1
      index >= 0
        ? updateTrackPlaying(data[index].trackId)
        : updateTrackPlaying(data[data.length - 1].trackId)
    })
  }

  const runFirtsTrack = (id, type) => {
    const changePage = (id !== idArtist && id !== idPlayList && id !== idAlbum)
    if (type) { setTypeMusic(type) }
    if (changePage) {
      let getInfo
      if (type === 'artist') {
        getInfo = getArtistTopTrack(id)
        setIdArtist(id)
        setIdPlayList(null)
        setIdAlbum(null)
      } else if (type === 'playlist') {
        getInfo = getTracksFromPlayList(id)
        setIdPlayList(id)
        setIdArtist(null)
        setIdAlbum(null)
      } else if (type === 'album') {
        getInfo = getTracksFromAlbum(id)
        setIdAlbum(id)
        setIdArtist(null)
        setIdPlayList(null)
      }
      getInfo.then((data) => {
        updateTrackPlaying(data[0].trackId)
      })
    } else if (isPlaying || trackPlaying) {
      runTrack()
    }
  }

  const handleLoadedMetadata = () => {
    setDuration(audioPlayer.duration)
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.currentTime)
  }

  useEffect(() => {
    audioPlayer.volume = volume
  }, [volume])
  const saveRecentlyListended = async () => {
    const userId = user?._id
    let name
    let idMusic

    try {
      if (typeMusic === 'playlist') {
        idMusic = idPlayList
        const playlistInfo = await getPlayListInfo(idPlayList)
        name = playlistInfo.name
      } else if (typeMusic === 'artist') {
        idMusic = idArtist
        name = trackPlaying.owner[0][1]
      } else if (typeMusic === 'album') {
        idMusic = idAlbum
        name = trackPlaying.album[1]
      }

      await userService.AddrecentyListened({ userId, typeMusic, idMusic, urlImg: trackPlaying.urlImg, name })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TrackPlayingContext.Provider
      value={{
        trackPlaying,
        updateTrackPlaying,
        isPlaying,
        runTrack,
        setIdPlayList,
        runNextTrack,
        runFirtsTrack,
        runPrevTrack,
        setVolumeTrack,
        duration,
        currentTime,
        setIdArtist,
        setTypeMusic,
        idArtist,
        idPlayListTrack: idPlayList,
        idAlbumTrack: idAlbum,
        audioPlayer,
        typeMusic
      }}
    >
      {children}
    </TrackPlayingContext.Provider>
  )
}
