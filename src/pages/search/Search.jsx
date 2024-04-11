import { useContext } from 'react'
import { Header } from '../../components/Search/Header'
import styles from './search.module.css'
import { SearchContext } from '../../contexts/search.context'
import { RelatedArtist } from '../../components/Artist/RelatedArtist'
export function Search () {
  const { searchInfo, setIsHoverTrack, divWidth } = useContext(SearchContext)
  return (

    <section className={styles.search} id='searchContainer'>

      <Header searchInfo={searchInfo} setIsHoverTrack={setIsHoverTrack} />
      {divWidth && searchInfo &&
        <>
          <RelatedArtist relatedArtist={searchInfo?.appearOn} divWidth={divWidth} url='album'>
            Incluye a {searchInfo.artists[0].name}
          </RelatedArtist>
          <RelatedArtist relatedArtist={searchInfo.artists} divWidth={divWidth} circuleImg url='artist'>
            Artistas
          </RelatedArtist>
          <RelatedArtist relatedArtist={searchInfo.albums} divWidth={divWidth} url='album'>
            Albunes
          </RelatedArtist>
          <RelatedArtist relatedArtist={searchInfo.playLists} divWidth={divWidth} url='playlist'>
            Listas
          </RelatedArtist>
        </>}
    </section>

  )
}
