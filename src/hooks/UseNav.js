import { useState } from 'react'

export function UseNav () {
  const [profileOptVisible, setProfileOptvisible] = useState(false)
  const [navBackgrund, setNavBackground] = useState('#121212')
  const changeBackgroundNav = (color) => setNavBackground(color)
  return ({
    profileOptVisible,
    setProfileOptvisible,
    navBackgrund,
    changeBackgroundNav
  })
}
