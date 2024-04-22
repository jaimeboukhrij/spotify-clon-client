import { useContext } from 'react'
import { AllTracks } from '../../components/PlayList/AllTracks'
import { Header } from '../../components/PlayList/Header'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { UsePlayList } from '../../hooks/UsePlayList'
import styles from './playList.module.css'
import { ActionBar } from '../../components/actionBar/ActionBar'
import { Loader } from '../../components/loader/Loader'

export function PlayList () {
  const { tracks, playListInfo, setIsHoverTrack, bgColor, updateTrackPlaying, idPlayList } = UsePlayList()
  const { trackPlaying } = useContext(TrackPlayingContext)

  return (
    <>

      <section
        style={{
          background: `linear-gradient(${bgColor[0]}, rgba(0, 0, 0, .4) 70%)`,
          paddingBottom: trackPlaying ? '11%' : '36px'
        }}
        className={styles.container}
        id='playListSection'
      >
        {bgColor.length ?
          <>
            <Header playListInfo={playListInfo} tracks={tracks} />
            <section className={styles.mainSection}>
              <ActionBar idToPlay={idPlayList} type='playlist' />
              <AllTracks
                setIsHoverTrack={setIsHoverTrack} tracks={tracks}
                updateTrackPlaying={updateTrackPlaying}
              />
            </section>
          </>
          : <Loader />}
      </section>
    </>
  )
}
