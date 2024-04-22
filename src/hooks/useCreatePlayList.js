import { useContext, useEffect, useRef, useState } from 'react'
import uploadPhoto from '../utils/uploadPhoto'
import playListService from '../services/playList.service'
import { useNavigate, useParams } from 'react-router'
import { GlobalVarContext } from '../contexts/globalVar.context'
import { getTrackInfo } from '../utils/getTrackInfo'
import { SearchContext } from '../contexts/search.context'
import getDominantColorFromImage from '../utils/getDominantColorFromImage'

export function useCreatePlayList () {
  const [hoverAddPhoto, setHoverAddPhoto] = useState(false)
  const inputRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)
  const { changeMyPlayLis, setChangeMyPL } = useContext(GlobalVarContext)
  const [upadatePhoto, setUpdatePhoto] = useState(false)
  const [bgColor, setBgColor] = useState([])
  const [tracksSearched, setTracksSearched] = useState()
  const [tracksIds, setTracksIds] = useState()
  const [playListInfo, setPlayListInfo] = useState()
  const { idPlayList } = useParams()
  const { setQuery, searchInfo } = useContext(SearchContext)
  const navigate = useNavigate()
  useEffect(() => {
    setBgColor([])
    setQuery('')
    playListService
      .getPlayListInfo(idPlayList)
      .then(({ data }) => setPlayListInfo(data))
      .catch(e => console.log(e))
  }, [idPlayList])

  useEffect(() => {
    actTracksIds()
    if (playListInfo) {
      const data = playListInfo.tracks?.map(elem => elem.trackId)
      setTracksIds(data)
      getDominantColorFromImage(playListInfo.urlImg).then(data => {
        setBgColor([data])
      })
    }
  }, [playListInfo])

  useEffect(() => {
    filterTracks()
  }, [searchInfo?.tracks.length, tracksIds?.length])

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => {
    setOpenModal(false)
    playListService
      .getPlayListInfo(idPlayList)
      .then(({ data }) => setPlayListInfo(data))
      .catch(e => console.log(e))
  }
  const handleClick = () => {
    inputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setPlayListInfo(prev => ({ ...prev, urlImg: null }))
      const file = event.target.files[0]
      setUpdatePhoto(true)
      try {
        const imgUrl = await uploadPhoto(file)
        setPlayListInfo(prev => ({ ...prev, urlImg: imgUrl }))
      } finally {
        setUpdatePhoto(false)
      }
    }
  }
  const handleQueryChange = (e) => {
    const { value, name } = e.target
    setPlayListInfo(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = () => {
    playListService
      .savePlayList(playListInfo)
      .then(({ data }) => {
        handleClose()
        setChangeMyPL(!changeMyPlayLis)
        // setPlayListInfo(data)
      })
      .catch(e => console.log(e))
  }
  const addTrack = (idTrack) => {
    getTrackInfo(idTrack)
      .then(data => {
        const newData = {
          trackName: data.name,
          duration: data.duration,
          date: data.date,
          trackId: data.id,
          artistTrack: data.owner.map(elem => elem[1]),
          artistTrackId: data.owner.map(elem => elem[0]),
          album: data.album[1],
          urlImg: data.urlImg,
          isHover: false,
          albumId: data.album[0],
          urlTrack: data.urlTrack
        }
        setPlayListInfo(prev => {
          const state = prev
          state.tracks.push(newData)
          playListService
            .savePlayList(state)
            .then(({ data }) => {
              handleClose()
              setChangeMyPL(!changeMyPlayLis)
              setQuery(prev => prev)
            // setPlayListInfo(data)
            })
            .catch(e => console.log(e))
            .finally(() => {
              actTracksIds()
            })
          return state
        })
      })
  }
  const deleteTrack = (idTrack) => {
    setPlayListInfo(prev => {
      const state = prev
      const tracksFilter = state.tracks.filter(elem => elem.trackId !== idTrack)
      state.tracks = tracksFilter
      playListService
        .savePlayList(state)
        .then(({ data }) => {
          handleClose()
          setChangeMyPL(!changeMyPlayLis)
        })
        .catch(e => console.log(e))
        .finally(() => {
          actTracksIds()
        })
      return state
    })
  }
  const setIsHoverTrack = (trackIndex, isHover) => {
    setPlayListInfo(prev => ({
      ...prev,
      tracks: prev.tracks.map((track, index) =>
        index === trackIndex ? { ...track, isHover } : track
      )
    }))
  }
  const filterTracks = () => {
    const filterTracks = searchInfo?.tracks.filter(elem => !tracksIds.includes(elem.id)).slice(0, 10)
    setTracksSearched(filterTracks)
  }
  const actTracksIds = () => {
    if (playListInfo) {
      const data = playListInfo.tracks?.map(elem => elem.trackId)
      setTracksIds(data)
    }
  }
  const deletePlay = (playListId) => {
    playListService.deletePlayList(playListId)
      .then(data => {
        playListService
          .getPlayListInfo(idPlayList)
          .then(({ data }) => setPlayListInfo(data))
          .catch(e => console.log(e))
        navigate('/')
        setChangeMyPL(!changeMyPlayLis)
      })
      .catch(e => console.log(e))
  }

  return {
    hoverAddPhoto,
    setHoverAddPhoto,
    inputRef,
    handleClick,
    handleFileChange,
    handleOpen,
    handleClose,
    openModal,
    handleQueryChange,
    playListInfo,
    handleSubmit,
    upadatePhoto,
    bgColor,
    setBgColor,
    addTrack,
    tracksIds,
    deleteTrack,
    setIsHoverTrack,
    idPlayList,
    tracksSearched,
    deletePlay

  }
}
