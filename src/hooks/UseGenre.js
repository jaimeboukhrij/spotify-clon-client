/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import getPlayListByGenre from '../utils/getPlayListsByGenre'
import { GlobalVarContext } from '../contexts/globalVar.context'
import newSpotifyService from '../services/spotify.service'

export function useGenre (changeNavColor) {
  const [playlists, setPlayLists] = useState([])
  const [categoryName, setCategoryName] = useState(null)
  const [categoryImg, setCategoryImg] = useState(null)
  const [limit, setLimit] = useState(10)
  const { randomBG, setRandomBG, setNavFilter, setPageName } = useContext(GlobalVarContext)

  const { idGenre } = useParams()
  useEffect(() => {
    changeNavColor('transparent')
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
    const handleScroll2 = () => {
      const outerDiv = document.getElementById('nav')
      const innerDiv = document.getElementById('mainSectionGenre')

      if (!outerDiv || !innerDiv) return

      const outerDivRect = outerDiv.getBoundingClientRect()
      const innerDivRect = innerDiv.getBoundingClientRect()

      if (
        innerDivRect.top >= outerDivRect.top
      ) {
        changeNavColor('transparent')
        setNavFilter(false)
      } else {
        randomBG && changeNavColor(randomBG)
        setNavFilter(true)
      }
    }

    if (document.getElementById('sectionGenre')) {
      document.getElementById('sectionGenre').addEventListener('scroll', handleScroll)
    }
    if (document.getElementById('sectionGenre')) {
      document.getElementById('sectionGenre').addEventListener('scroll', handleScroll2)
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)
      changeNavColor('#121212')
      setNavFilter(false)
    }
  }, [randomBG])

  useEffect(() => {
    if (categoryName) {
      newSpotifyService.getOneCategoryInfo(idGenre)
        .then(({ data }) => {
          setCategoryImg(data.icons[0].url)
          setPageName(categoryName)
        })
        .catch(e => console.log(e))
    }
  }, [categoryName])

  return {
    categoryName,
    playlists,
    randomBG,
    categoryImg,
    setRandomBG
  }
}
