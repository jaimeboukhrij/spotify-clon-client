import { useContext } from 'react'
import { Header } from '../../components/Search/Header'
import styles from './search.module.css'
import { SearchContext } from '../../contexts/search.context'
import { RelatedArtist } from '../../components/Artist/RelatedArtist'
import { Loader } from '../../components/loader/Loader'
import { Footer } from '../../components/Footer/Footer'
export function Search () {
  const { searchInfo, setIsHoverTrack, divWidth } = useContext(SearchContext)
  return (

    <section className={styles.search} id='searchContainer'>

      <Header searchInfo={searchInfo} setIsHoverTrack={setIsHoverTrack} />
      {divWidth && searchInfo
        ?
          <>
            <RelatedArtist relatedArtist={searchInfo?.appearOn} divWidth={divWidth} url='album'>
              <h2 style={{ paddingLeft: '1%' }}>Incluye a {searchInfo.artists[0].name}</h2>
            </RelatedArtist>
            <RelatedArtist relatedArtist={searchInfo.artists} divWidth={divWidth} circuleImg url='artist'>
              <h2 style={{ paddingLeft: '1%' }}> Artistas</h2>
            </RelatedArtist>
            <RelatedArtist relatedArtist={searchInfo.albums} divWidth={divWidth} url='album'>
              <h2 style={{ paddingLeft: '1%' }}> Albunes</h2>
            </RelatedArtist>
            <RelatedArtist relatedArtist={searchInfo.playLists} divWidth={divWidth} url='playlist'>
              <h2 style={{ paddingLeft: '1%' }}> Listas</h2>
            </RelatedArtist>
            <Footer />
          </>
        : <Loader />}
    </section>

  )
}
