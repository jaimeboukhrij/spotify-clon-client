import { ColorExtractor } from 'react-color-extractor'
import { useArtist } from '../../hooks/UseArtist'
import styles from './artist.module.css'
import { useContext } from 'react'
import { Header } from '../../components/Artist/Header'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Tracks } from '../../components/Artist/Tracks'
import { RelatedArtist } from '../../components/Artist/RelatedArtist'
import { Loader } from '../../components/loader/Loader'

export function Artist () {
  const { artist, setIsHoverTrack, artistRef, divWidth, loading, idArtist, bgColor, setBgColor } = useArtist()
  const { isPlaying, runFirtsTrack, idArtist: idArtistTrack, trackPlaying } = useContext(TrackPlayingContext)
  if (loading) {
    return <Loader />
  }

  return (
    <>

      <ColorExtractor getColors={colors => setBgColor(colors)}>
        <img src={artist?.headerImage} alt='colorImg' style={{ display: 'none' }} />
      </ColorExtractor>
      {bgColor && artist.artistAppearsOn &&
        <section
          className={styles.container}
          id='containerArtist'
          style={{
            background: `linear-gradient(${bgColor[0]}, rgba(0, 0, 0, .4) 57%)`,
            paddingBottom: trackPlaying ? '11%' : '36px'

          }}
        >

          <Header artist={artist} />
          <section ref={artistRef} className={styles.mainSection} id='tracksArtist'>
            <article style={{ paddingLeft: '1%', display: 'flex', alignItems: 'center', gap: '25px' }}>
              <span
                onClick={() => runFirtsTrack(idArtist, 'artist')}
                className={styles.playIcon}
              ><box-icon name={isPlaying && idArtist === idArtistTrack ? 'pause' : 'play'} size='40px' />
              </span>
              <button>Seguir</button>
            </article>
            <Tracks tracks={artist.topTracks} setIsHoverTrack={setIsHoverTrack} />
            <RelatedArtist relatedArtist={artist.relatedArtist} divWidth={divWidth} circuleImg url='artist'>
              Sus fans también escuchan
            </RelatedArtist>
            <RelatedArtist relatedArtist={artist?.artistAppearsOn} divWidth={divWidth} url='album'>
              Aparece en
            </RelatedArtist>
            <RelatedArtist relatedArtist={artist?.artistFeaturing} divWidth={divWidth} url='playlist'>
              Incluye a {artist.name}
            </RelatedArtist>
            <RelatedArtist relatedArtist={artist?.artistDiscoveredOn} divWidth={divWidth} url='playlist'>
              Donde se le puede descubrir
            </RelatedArtist>
          </section>
        </section>}

    </>
  )
}
