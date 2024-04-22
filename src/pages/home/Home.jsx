import { useContext } from 'react'
import { RelatedArtist } from '../../components/Artist/RelatedArtist'
import { useHome } from '../../hooks/useHome'
import styles from './home.module.css'
import { AuthContext } from '../../contexts/auth.context'
import { Header } from '../../components/Home/Header'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Footer } from '../../components/Footer/Footer'
export function Home () {
  const { playListInfo, divWidth, favouriteArtists, radios, recentListened, imgColor, setImgColor, bgColor, setBgColor } = useHome()
  const { user } = useContext(AuthContext)
  const { trackPlaying } = useContext(TrackPlayingContext)

  return (
    <>
      <section
        className={styles.main}
        style={{
          background: `linear-gradient(${bgColor.length ? bgColor[0] : 'gray'}, rgba(0, 0, 0, .4) 70%)`,
          paddingBottom: trackPlaying ? '9%' : '36px'

        }}
      >
        <Header recentListened={recentListened} imgColor={imgColor} setImgColor={setImgColor} setBgColor={setBgColor} />
        <RelatedArtist relatedArtist={playListInfo} divWidth={divWidth} url='playlist'>
          <h2 style={{ paddingLeft: '1%' }}> Recomendado para {user?.profileName}</h2>
        </RelatedArtist>
        <RelatedArtist relatedArtist={favouriteArtists} divWidth={divWidth} url='artist' circuleImg>
          <h2 style={{ paddingLeft: '1%' }}> Tus artistas favoritos</h2>
        </RelatedArtist>
        <RelatedArtist relatedArtist={radios} divWidth={divWidth} url='playlist'>
          <h2 style={{ paddingLeft: '1%' }}> Emisoras Populares</h2>
        </RelatedArtist>
        <Footer />

      </section>
    </>
  )
}
