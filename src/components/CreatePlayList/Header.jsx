import styles from '../../pages/createPlayList/createplaylist.module.css'
export function Header ({ hoverAddPhoto, setHoverAddPhoto, handleOpen, openModal, playListInfo }) {
  return (
    playListInfo &&
      <article className={styles.header}>
        <div
          onMouseEnter={() => setHoverAddPhoto(true)}
          onMouseLeave={() => setHoverAddPhoto(false)}
          onClick={handleOpen}
          className={styles.addPhoto}
          style={{ backgroundImage: playListInfo.urlImg ? `url(${playListInfo.urlImg})` : 'none' }}
        >
          {/* <input
          ref={inputRef}
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        /> */}
          <span>
            {hoverAddPhoto && !openModal
              ? (
                <i>
                  <box-icon name='pencil' type='solid' color='white' size='70px' />
                  <p>Elegir foto</p>
                </i>
                )
              : (
                  !playListInfo.urlImg && <box-icon name='music' color='#616161' size='80px' />
                )}
          </span>
        </div>
        <div className={styles.info}>
          <span>Lista</span>
          <h2 onClick={handleOpen}>{playListInfo.name}</h2>
          <span style={{ color: 'hsla(0, 0%, 100%, .7)', fontWeight: '700' }}>{playListInfo.description}</span>
          <span>jaimeboukhrij</span>
        </div>
      </article>
  )
}
