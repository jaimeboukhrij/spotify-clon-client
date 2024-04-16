import { useContext, useEffect } from 'react'
import { GlobalVarContext } from '../contexts/globalVar.context'

export function useBgNav ({ bgColor, outerDivName, innerDivName }) {
  const { setNavFilter, setNavColor } = useContext(GlobalVarContext)
  useEffect(() => {
    setNavColor('transparent')
    setNavFilter(false)
  }, [])
  useEffect(() => {
    const container = document.getElementById(outerDivName)
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll)
    }
  })

  const handleScroll = () => {
    const outerDiv = document.getElementById(outerDivName)
    const innerDiv = document.getElementById(innerDivName)
    if (!outerDiv || !innerDiv) return
    const outerDivRect = outerDiv.getBoundingClientRect()
    const innerDivRect = innerDiv.getBoundingClientRect()
    if (
      innerDivRect.top >= outerDivRect.top + 60
    ) {
      setNavColor('transparent')
      setNavFilter(false)
    } else {
      bgColor && setNavColor(bgColor[0])
      setNavFilter(true)
    }
  }
}
