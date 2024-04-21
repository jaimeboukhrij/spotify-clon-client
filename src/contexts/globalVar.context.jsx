import { createContext, useState } from 'react'

export const GlobalVarContext = createContext()

export function GlobalVarProviderWrapper ({ children }) {
  const [randomBG, setRandomBG] = useState(false)
  const [navFilter, setNavFilter] = useState(false)
  const [pageName, setPageName] = useState(null)
  const [navColor, setNavColor] = useState('transparent')
  const [changeMyPlayLis, setChangeMyPL] = useState(false)
  return (
    <GlobalVarContext.Provider value={{
      randomBG,
      setRandomBG,
      navFilter,
      setNavFilter,
      pageName,
      setPageName,
      navColor,
      setNavColor,
      changeMyPlayLis,
      setChangeMyPL
    }}
    >
      {children}
    </GlobalVarContext.Provider>
  )
}
