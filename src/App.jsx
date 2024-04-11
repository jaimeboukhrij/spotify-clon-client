import { useLocation } from 'react-router'
import './App.css'
import { Aside } from './components/Aside/Aside'
import { Nav } from './components/Nav/Nav'
import { AuthProviderWrapper } from './contexts/auth.context'
import AppRoutes from './routes/AppRoutes'
import { useApp } from './hooks/UseApp' // Cambio de UseApp a useApp
import { GlobalVarProviderWrapper } from './contexts/globalVar.context'
import { PlayerTrack } from './components/PlayerTrack/PlayerTrack'
import { TrackPlayProviderWrapper } from './contexts/trackPlaying'
import { SearchVarProviderWrapper } from './contexts/search.context'

function App () {
  const location = useLocation()
  const isLoginRoute = location.pathname === '/login' || location.pathname === '/signup'
  const { navColor, changeNavColor } = useApp()
  return (
    <>
      <AuthProviderWrapper>
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
                {!isLoginRoute && <Nav navColor={navColor} />}
                <AppRoutes changeNavColor={changeNavColor} />
              </main>
            </SearchVarProviderWrapper>
          </GlobalVarProviderWrapper>
        </TrackPlayProviderWrapper>
      </AuthProviderWrapper>
    </>
  )
}

export default App
