import { Header } from '../../components/CreatePlayList/Header'
import { useCreatePlayList } from '../../hooks/useCreatePlayList'
import styles from './createplaylist.module.css'
import { InputModal } from '../../components/CreatePlayList/InputModal'
import { ActionBar } from '../../components/actionBar/ActionBar'
import ColorExtractorComp  from '../../components/colorExtractor/ColorExtractorComp'
import { AddTracks } from '../../components/CreatePlayList/AddTracks'
import { AllTracks } from '../../components/PlayList/AllTracks'
import { Loader } from '../../components/loader/Loader'
import { Footer } from '../../components/Footer/Footer'
export function CreatePlayList () {
  const {
    hoverAddPhoto, setHoverAddPhoto, handleClick, handleClose,
    handleOpen, openModal, handleQueryChange, playListInfo,
    inputRef, handleFileChange, handleSubmit, upadatePhoto,
    bgColor, setBgColor, addTrack, tracksIds, deleteTrack, setIsHoverTrack, idPlayList,
    tracksSearched
  } = useCreatePlayList()
  return (
    <>
      {playListInfo?.urlImg && <ColorExtractorComp urlImg={playListInfo.urlImg} setBgColor={setBgColor} />}
      <section
        className={styles.container}
        style={{ background: `linear-gradient(${bgColor[0]} 0, rgba(7, 7, 7, 0.852) 50%)` }}
      >
        <Header
          hoverAddPhoto={hoverAddPhoto} setHoverAddPhoto={setHoverAddPhoto}
          handleClick={handleClick} handleOpen={handleOpen} openModal={openModal} playListInfo={playListInfo}
        />
        <ActionBar idToPlay={idPlayList} type='myplaylist' />
        <section className={styles.mainSection}>
          {
        playListInfo?.tracks ?
          <AllTracks tracks={playListInfo?.tracks} tracksIds={tracksIds} deleteTrack={deleteTrack} setIsHoverTrack={setIsHoverTrack} />
          : <Loader />
      }
        </section>
        <AddTracks addTrack={addTrack} playListInfo={playListInfo} tracksIds={tracksIds} tracksSearched={tracksSearched} />
        <Footer />
        <InputModal
          handleClose={handleClose} openModal={openModal}
          hoverAddPhoto={hoverAddPhoto} setHoverAddPhoto={setHoverAddPhoto}
          handleQueryChange={handleQueryChange} playListInfo={playListInfo}
          inputRef={inputRef} handleFileChange={handleFileChange} handleClick={handleClick}
          handleSubmit={handleSubmit} upadatePhoto={upadatePhoto}
        />
      </section>
    </>

  )
}
