import { createContext, useState } from 'react'

export const GlobalVarContext = createContext()

export function GlobalVarProviderWrapper ({ children }) {
  const [randomBG, setRandomBG] = useState()
  const [navFilter, setNavFilter] = useState(false)
  const [pageName, setPageName] = useState(null)

  return (
    <GlobalVarContext.Provider value={{
      randomBG,
      setRandomBG,
      navFilter,
      setNavFilter,
      pageName,
      setPageName
    }}
    >
      {children}
    </GlobalVarContext.Provider>
  )
}
