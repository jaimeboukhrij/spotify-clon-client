/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import getPlayListByGenre from '../utils/getPlayListsByGenre'
import { GlobalVarContext } from '../contexts/globalVar.context'
import newSpotifyService from '../services/spotify.service'
import { useBgNav } from './UseBgNav'

export function useGenre () {
  const [playlists, setPlayLists] = useState([])
  const [categoryName, setCategoryName] = useState(null)
  const [categoryImg, setCategoryImg] = useState(null)
  const [limit, setLimit] = useState(10)
  const { randomBG, setRandomBG, setPageName } = useContext(GlobalVarContext)
  const { idGenre } = useParams()
  const outerDivName = 'sectionGenre'
  const innerDivName = 'mainSectionGenre'
  useBgNav({ bgColor: [randomBG], outerDivName, innerDivName })
  useEffect(() => document.getElementById(outerDivName)?.scrollTo(0, 0), [])
  useEffect(() => {
    getPlayListByGenre(idGenre, setCategoryName, setPlayLists, limit)
    const container = document.getElementById('sectionGenre')
    const handleScroll = () => {
      if (container.scrollTop + container.clientHeight === (container.scrollHeight)) {
        setLimit(prev => {
          const newLimit = prev + 10
          getPlayListByGenre(idGenre, setCategoryName, setPlayLists, newLimit)
          return newLimit
        })
      }
    }

    if (document.getElementById('sectionGenre')) {
      document.getElementById('sectionGenre').addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)
      // setNavFilter(false)
    }
  }, [playlists.length])

  useEffect(() => {
    if (categoryName) {
      newSpotifyService.getOneCategoryInfo(idGenre)
        .then(({ data }) => {
          setCategoryImg(data.icons[0].url)
          setPageName(categoryName)
        })
        .catch(e => console.log(e))
    }
  }, [categoryName, idGenre])
  return {
    categoryName,
    playlists,
    randomBG,
    categoryImg,
    setRandomBG
  }
}
