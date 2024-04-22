/* eslint-disable react/jsx-closing-tag-location */
import { useContext } from 'react'
import { Header } from '../../components/Album/Header'
import { useAlbum } from '../../hooks/UseAlbum'
import styles from './album.module.css'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { AllTracks } from '../../components/Album/AllTracks'
import { numberDateToWriteDate } from '../../utils/numberDateToWriteDate'
import { RelatedArtist } from '../../components/Artist/RelatedArtist'
import { Footer } from '../../components/Footer/Footer'
export function Album () {
  const { albumInfo, albumTracks, setIsHoverTrack, idAlbum, artistdiscography, width, bgColor } = useAlbum()
  const { isPlaying, runFirtsTrack, idAlbumTrack, trackPlaying } = useContext(TrackPlayingContext)

  return (
    <>

      {bgColor && <section
        style={{
          width: '-webkit-fill-available',
          height: '-webkit-fill-available',
          position: 'sticky',
          minWidth: '500px',
          background: `linear-gradient(${bgColor[0]}, rgba(0, 0, 0, .4) 70%)`,
          overflow: 'hidden auto',
          marginBottom: trackPlaying ? '83px' : '0px'
        }}
        className={styles.container}
        id='albumContainer'
                  >

        <Header albumInfo={albumInfo} albumTracks={albumTracks} />
        <section className={styles.mainSection} id='tracksOfAlbum'>
          <article style={{ paddingLeft: '1%', display: 'flex', alignItems: 'center', gap: '25px' }}>
            <span
              onClick={() => runFirtsTrack(idAlbum, 'album')}
              className={styles.playIcon}
            ><box-icon name={(isPlaying && (idAlbumTrack === idAlbum)) ? 'pause' : 'play'} size='40px' />
            </span>
            <span className={styles.heart}>
              <box-icon name='heart' color='white' size='40px' className='heart' />
            </span>
          </article>
          <AllTracks tracks={albumTracks} setIsHoverTrack={setIsHoverTrack} />
          <article className={styles.copyRights}>
            <p style={{ fontSize: '15px' }}>{numberDateToWriteDate(albumInfo.date)}</p>
            <p>{albumInfo.copyRights}</p>
          </article>
          <RelatedArtist relatedArtist={artistdiscography} divWidth={width} url='album'>
            Mas de {albumInfo.name}
          </RelatedArtist>
          <Footer />
        </section>
      </section>}
    </>
  )
}
