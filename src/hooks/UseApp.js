import { useState } from 'react'

export function useApp () {
  const [navColor, setNavColor] = useState('#121212')
  const changeNavColor = (color) => setNavColor(color)

  return {
    navColor,
    changeNavColor
  }
}
