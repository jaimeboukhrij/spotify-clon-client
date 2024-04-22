import { SearchForm } from './SearchForm'
import styles from '../../pages/createPlayList/createplaylist.module.css'
import { useContext } from 'react'
import { SearchContext } from '../../contexts/search.context'
import { TracksList } from '../tracksList/TracksList'

export function AddTracks ({ addTrack, playListInfo, tracksIds, tracksSearched }) {
  const { searchInfo } = useContext(SearchContext)

  return (
    <section className={styles.AddTracks}>
      <div>
        <h2>Encontremos algo para tu lista</h2>
      </div>
      <SearchForm />
      {
        searchInfo
          &&
            <TracksList tracks={tracksSearched} limit={10} addTrack={addTrack} tracksIds={tracksIds} />
      }
    </section>
  )
}
