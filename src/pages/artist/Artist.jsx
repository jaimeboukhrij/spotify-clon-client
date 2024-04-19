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
  const { artist, setIsHoverTrack, artistRef, divWidth, idArtist, bgColor, setBgColor, headerInfo, saveFavourtieArtist, followingArtist } = useArtist()
  const { isPlaying, runFirtsTrack, idArtist: idArtistTrack, trackPlaying } = useContext(TrackPlayingContext)

  return (
    <>

      <ColorExtractor getColors={colors => setBgColor(colors)}>
        <img src={artist?.headerImage} alt='colorImg' style={{ display: 'none' }} />
      </ColorExtractor>

      <section
        className={styles.container}
        id='containerArtist'
        style={{
          background: `linear-gradient(${bgColor?.[0]}, rgba(0, 0, 0, .4) 57%)`,
          marginBottom: trackPlaying ? '83px' : '0px'

        }}
      >

        {headerInfo ? <Header artist={headerInfo} /> : ''}
        {artist?.artistDiscoveredOn
          ?
            <section ref={artistRef} className={styles.mainSection} id='tracksArtist'>
              <article style={{ paddingLeft: '1%', display: 'flex', alignItems: 'center', gap: '25px' }}>
                <span
                  onClick={() => runFirtsTrack(idArtist, 'artist')}
                  className={styles.playIcon}
                ><box-icon name={isPlaying && idArtist === idArtistTrack ? 'pause' : 'play'} size='40px' />
                </span>
                {
                  followingArtist
                    ? <button style={{ backgroundColor: '#8080803b' }} onClick={saveFavourtieArtist}>Dejar de Seguir</button>
                    : <button style={{ backgroundColor: 'transparent' }} onClick={saveFavourtieArtist}>Seguir</button>
                }
              </article>
              <Tracks tracks={artist.topTracks} setIsHoverTrack={setIsHoverTrack} />
              <RelatedArtist relatedArtist={artist.relatedArtist} divWidth={divWidth} circuleImg url='artist'>
                <h2 style={{ paddingLeft: '1%' }}> Sus fans también escuchan </h2>
              </RelatedArtist>
              <RelatedArtist relatedArtist={artist?.artistAppearsOn} divWidth={divWidth} url='album'>
                <h2 style={{ paddingLeft: '1%' }}>Aparece en</h2>
              </RelatedArtist>
              <RelatedArtist relatedArtist={artist?.artistFeaturing} divWidth={divWidth} url='playlist'>
                <h2 style={{ paddingLeft: '1%' }}>Incluye a {artist.name}</h2>
              </RelatedArtist>
              <RelatedArtist relatedArtist={artist?.artistDiscoveredOn} divWidth={divWidth} url='playlist'>
                <h2 style={{ paddingLeft: '1%' }}>Donde se le puede descubrir</h2>
              </RelatedArtist>
            </section>
          : <Loader />}
      </section>

    </>
  )
}
