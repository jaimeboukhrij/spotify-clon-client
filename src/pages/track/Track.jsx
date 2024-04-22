import { Header } from '../../components/Track/Header'
import { useTrack } from '../../hooks/UseTrack'
import styles from './track.module.css'
import { ActionBar } from '../../components/actionBar/ActionBar'
import { Artists } from '../../components/Track/Artists'
import { TracksList } from '../../components/tracksList/TracksList'
import { RelatedArtist } from '../../components/Artist/RelatedArtist'
import { Loader } from '../../components/loader/Loader'
export function Track () {
  const { trackInfo, artistsData, setIsHoverTrack, artistAlbums, divWidth, bgColor } = useTrack()
  return (
    <>

      {artistsData?.length && bgColor.length
        ?
          <section
            className={styles.container}
            style={{ background: `linear-gradient(${bgColor[0]}, rgba(0, 0, 0, .4) 70%)` }}
            id='containerTracks'
          >
            <Header trackInfo={trackInfo} artistImg={artistsData?.[0].data.imgUrl} />
            <section className={styles.mainSection} id='tracksOfTracks'>
              <ActionBar idToPlay={trackInfo?.id} playOneTrack type='album' />
              <Artists artistsData={artistsData} />
              <TracksList tracks={trackInfo?.tracksRecomendations} setIsHoverTrack={setIsHoverTrack}>
                Recomendaciones
              </TracksList>
              <TracksList tracks={artistsData?.[0]?.topTracks} setIsHoverTrack={setIsHoverTrack}>
                Canciones populares de {artistsData?.[0]?.data.name}
              </TracksList>
              <RelatedArtist relatedArtist={artistAlbums?.album} divWidth={divWidth} url='album'>
                <h2 style={{ paddingLeft: '1%' }}> Albumes populares de {artistsData?.[0]?.data.name}</h2>
              </RelatedArtist>
              <RelatedArtist relatedArtist={artistAlbums?.single} divWidth={divWidth} url='album'>
                <h2 style={{ paddingLeft: '1%' }}> Sencillos y EP populares de {artistsData?.[0]?.data.name}</h2>
              </RelatedArtist>
              {
              artistsData?.slice(1, artistsData.length).map(elem => {
                return (
                  <RelatedArtist key={elem.data.id} relatedArtist={elem.topAlbums} divWidth={divWidth} url='album'>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', width: '33%' }}>
                      <img src={elem.data.imgUrl} alt='' style={{ clipPath: 'circle()' }} />
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', width: '60%' }}>
                        <p style={{ margin: '0', fontSize: '14px', fontWeight: '700' }}>Titulo Populares</p>
                        <h2 style={{ paddingLeft: '1%', margin: '0', fontWeight: '600', fontSize: '20px' }}> {elem.data.name}</h2>

                      </span>
                    </div>
                  </RelatedArtist>
                )
              })
            }
              <RelatedArtist relatedArtist={artistsData?.[0]?.relatedArtists} divWidth={divWidth} url='artist' circuleImg>
                <h2 style={{ paddingLeft: '1%' }}> Sus fans tambien escuchan</h2>
              </RelatedArtist>

            </section>

          </section>
        : <Loader />}
    </>
  )
}
