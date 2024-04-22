import * as React from 'react'
import Box from '@mui/material/Box'
import styles from '../../pages/createPlayList/createplaylist.module.css'

import Modal from '@mui/material/Modal'
import { Loader } from '../loader/Loader'
export function InputModal ({
  handleClose, openModal, hoverAddPhoto, handleSubmit,
  setHoverAddPhoto, handleQueryChange, playListInfo, inputRef, handleFileChange, handleClick, upadatePhoto
}) {
  return (
    playListInfo &&
      <Modal
        open={openModal}
        onClose={handleClose}
      >
        <Box className={styles.modalContainer}>
          <article className={styles.firstSection}>
            <h5>Editar Informacion</h5>
            <i onClick={handleClose} style={{ cursor: 'pointer' }}><box-icon name='x' color='white' /></i>
          </article>
          <article className={styles.secondSection}>
            <div
              onMouseEnter={() => setHoverAddPhoto(true)}
              onMouseLeave={() => setHoverAddPhoto(false)}
              className={styles.addPhoto}
              onClick={handleClick}
              style={{ width: '177px', height: '177px', backgroundImage: playListInfo.urlImg ? `url(${playListInfo.urlImg})` : 'none' }}
            >
              <input
                ref={inputRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              <span>
                {
                  upadatePhoto
                    ? <Loader />
                    :
                    hoverAddPhoto
                      ? (
                        <i>
                          <box-icon name='pencil' type='solid' color='white' size='70px' />
                          <p>Elegir foto</p>
                        </i>
                        )
                      : (
                          !playListInfo.urlImg && <box-icon name='music' color='#616161' size='80px' />
                        )
}
              </span>
            </div>
            <div style={{ width: '58%', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
              <span className={styles.titleInput}>
                <label className={styles.label} htmlFor='title'>Nombre</label>
                <input type='text' name='name' value={playListInfo.name} onChange={handleQueryChange} />
              </span>
              <span className={styles.textInput}>
                <label className={styles.label} htmlFor='text' />
                <textarea
                  name='description' id='' cols='30' rows='10'
                  placeholder='Añade una descripción opcional'
                  value={playListInfo.description}
                  onChange={handleQueryChange}
                />
              </span>
            </div>
          </article>
          <article className={styles.thirdSection}>
            <button onClick={handleSubmit}>
              Guardar
            </button>
          </article>
          <p className={styles.aviso}>
            Al continuar, estás de acuerdo con dar a Spotify acceso a la imagen que selecciones para subir. Asegúrate de tener derecho a subir la imagen.
          </p>
        </Box>
      </Modal>
  )
}
