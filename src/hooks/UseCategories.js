import { useEffect, useState } from 'react'
import getCategories from '../utils/getCategories'

export function UseCategories () {
  const [allCategories, setAllCategories] = useState([])
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    const container = document.getElementById('main')
    const handleScroll = () => {
      if (container.scrollTop + container.clientHeight === container.scrollHeight) {
        setLimit(prev => {
          const newLimit = prev + 20
          getCategories(setAllCategories, newLimit)
          return newLimit
        })
      }
    }

    container && container.addEventListener('scroll', handleScroll)

    return () => {
      container && container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => getCategories(setAllCategories, limit), [limit])

  return {
    allCategories
  }
}
