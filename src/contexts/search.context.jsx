import { createContext, useEffect, useState } from 'react'
import { getQuerySearched } from '../utils/getQuerySearched'
import { useNavigate } from 'react-router'

export const SearchContext = createContext()

export function SearchVarProviderWrapper ({ children }) {
  const [query, setQuery] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [searchInfo, setSearchInfo] = useState()
  const [divWidth, setDivWidth] = useState(600)

  const navigate = useNavigate()
  const inSearch = /^\/search(\/.*)?$/.test(location.pathname)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(query)
    }, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query])

  useEffect(() => {
    if (debouncedValue || query) {
      debouncedValue && getQuerySearched(debouncedValue).then(data => {
        setSearchInfo(data)
        navigate(`/search/${query}`)
      }).catch(e => console.log(e))
    } else {
      setSearchInfo(null)
    }
  }, [debouncedValue, query])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }
  const setIsHoverTrack = (trackIndex, isHover) => {
    setSearchInfo(prevTracks => {
      const updatedTracks = { ...prevTracks }
      updatedTracks.tracks[trackIndex] = { ...prevTracks.tracks[trackIndex], isHover }
      return updatedTracks
    })
  }
  return (
    <SearchContext.Provider value={{
      query,
      handleChange,
      searchInfo,
      setIsHoverTrack,
      inSearch,
      divWidth,
      setQuery
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}
