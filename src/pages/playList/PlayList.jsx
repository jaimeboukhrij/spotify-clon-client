import { useContext } from 'react'
import { AllTracks } from '../../components/PlayList/AllTracks'
import { Header } from '../../components/PlayList/header'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { UsePlayList } from '../../hooks/UsePlayList'
import styles from './playList.module.css'
import { ActionBar } from '../../components/actionBar/ActionBar'
import { ColorExtractorComp } from '../../components/colorExtractor/ColorExtractorComp'

export function PlayList ({ changeNavColor }) {
  const { tracks, playListInfo, setIsHoverTrack, bgColor, setBgColor, updateTrackPlaying, idPlayList } = UsePlayList(changeNavColor)
  const { trackPlaying } = useContext(TrackPlayingContext)

  return (
    <>
      <ColorExtractorComp urlImg={playListInfo.urlImg} setBgColor={setBgColor} />
      {bgColor.length &&
        <section
          style={{
            width: '-webkit-fill-available',
            height: '-webkit-fill-available',
            position: 'sticky',
            minWidth: '500px',
            background: `linear-gradient(${bgColor[0]}, rgba(0, 0, 0, .4) 70%)`,
            overflow: 'hidden auto',
            paddingBottom: trackPlaying ? '11%' : '36px'

          }}
          className={styles.container}
          id='playListSection'
        >
          <Header playListInfo={playListInfo} tracks={tracks} />
          <section className={styles.mainSection}>
            <ActionBar idToPlay={idPlayList} type='playlist' />
            <AllTracks
              setIsHoverTrack={setIsHoverTrack} tracks={tracks}
              updateTrackPlaying={updateTrackPlaying}
              playListInfo={playListInfo}
            />
          </section>
        </section>}
    </>
  )
}
