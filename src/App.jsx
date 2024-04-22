import { useLocation } from 'react-router'
import './App.css'
import { Aside } from './components/Aside/Aside'
import { Nav } from './components/Nav/Nav'
import { AuthContext } from './contexts/auth.context'
import AppRoutes from './routes/AppRoutes'
import { GlobalVarProviderWrapper } from './contexts/globalVar.context'
import { PlayerTrack } from './components/PlayerTrack/PlayerTrack'
import { TrackPlayProviderWrapper } from './contexts/trackPlaying'
import { SearchVarProviderWrapper } from './contexts/search.context'
import { useContext, useEffect } from 'react'

function App () {
  const { deleteItem } = useContext(AuthContext)
  useEffect(() => {
    deleteItem()
  }, [])
  const location = useLocation()
  const isLoginRoute = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <>
      <TrackPlayProviderWrapper>
        <GlobalVarProviderWrapper>
          <SearchVarProviderWrapper>

            {!isLoginRoute && <Aside />}
            <PlayerTrack />
            <main
              id='main'
              style={{
                width: '-webkit-fill-available',
                height: '--webkit-fill-available',
                overflowY: 'hidden',
                overflowX: 'hidden',
                borderRadius: '7px',
                margin: '7px'
              }}
            >
              {!isLoginRoute && <Nav />}
              <AppRoutes />
            </main>
          </SearchVarProviderWrapper>
        </GlobalVarProviderWrapper>
      </TrackPlayProviderWrapper>
    </>
  )
}

export default App
