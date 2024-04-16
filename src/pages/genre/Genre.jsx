/* eslint-disable react/jsx-closing-tag-location */
import { useGenre } from '../../hooks/UseGenre'
import { Link } from 'react-router-dom'
import styles from './genre.module.css'
import { ColorExtractor } from 'react-color-extractor'
import { useContext } from 'react'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Loader } from '../../components/loader/Loader'

export function Genre () {
  const { categoryName, playlists, randomBG, setRandomBG } = useGenre()
  const { runFirtsTrack, isPlaying, idPlayList, trackPlaying } = useContext(TrackPlayingContext)

  return (
    <>
      <ColorExtractor getColors={colors => setRandomBG(colors[0])}>
        <img src={playlists?.[0]?.urlImg} alt='colorImg' style={{ display: 'none' }} />
      </ColorExtractor>
      {playlists?.length
        ? <section
            style={{
              background: `linear-gradient(${randomBG || 'rgb(140, 25, 50)'}, rgba(0, 0, 0, .4) 56%)`,
              width: '-webkit-fill-available',
              height: '-webkit-fill-available',
              position: 'sticky',
              minWidth: '500px',
              overflow: 'hidden auto'
            }}
            className={styles.section}
            id='sectionGenre'
          >
          <header
            className={styles.header}
          >
            <h2>{categoryName}</h2>
          </header>
          <section className={styles.mainSection} id='mainSectionGenre' style={{ paddingBottom: trackPlaying ? '80px' : '3%' }}>
            <h4>Todo el {categoryName}</h4>
            <div className={styles.playLists}>
              {
              playlists.map(({ name, description, id, color, urlImg }) => {
                return (
                  <Link to={`/playlist/${id}`} key={id} className={styles.eachPlayList}>
                    <div style={{ backgroundImage: `url(${urlImg})` }} className={styles.img}>
                      <span
                        onClick={(e) => {
                          e.preventDefault()
                          runFirtsTrack(id, 'playlist')
                        }}
                        className={styles.playIcon}
                      ><box-icon name={(!isPlaying || !(idPlayList === id)) ? 'play' : 'pause'} size='40px' />
                      </span>
                    </div>
                    {
                      name.length <= 20
                        ? <h6>{name}</h6>
                        : <h6>{name.substring(0, 20)}...</h6>
                    }
                    {
                      description.length <= 30
                        ? <p>{description}</p>
                        : <p>{`${description.substring(0, 30)}...`}</p>
                    }

                  </Link>
                )
              })
            }
            </div>
          </section>
        </section>
        : <Loader />}
    </>

  )
}
