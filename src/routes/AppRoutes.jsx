import { Route, Routes } from 'react-router-dom'
import { LogIn } from '../pages/auth/LogIn'
import { SignUp } from '../pages/auth/SignUp'
import { Home } from '../pages/home/Home'
import { Categories } from '../pages/categories/Categories'
import { Genre } from '../pages/genre/Genre'
import { PlayList } from '../pages/playList/PlayList'
import { Track } from '../pages/track/Track'
import { Artist } from '../pages/artist/Artist'
import { Album } from '../pages/album/Album'
import { Search } from '../pages/search/Search'

const AppRoutes = ({ changeNavColor }) => {
  return (
    <Routes>
      <Route path='/' element={<Home changeNavColor={changeNavColor} />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/search' element={<Categories />} />
      <Route path='/search/:query' element={<Search />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/album/:idAlbum' element={<Album changeNavColor={changeNavColor} />} />
      <Route path='/genre/:idGenre' element={<Genre changeNavColor={changeNavColor} />} />
      <Route path='/playlist/:idPlayList' element={<PlayList changeNavColor={changeNavColor} />} />
      <Route path='/track/:idTrack' element={<Track changeNavColor={changeNavColor} />} />
      <Route path='/artist/:idArtist' element={<Artist changeNavColor={changeNavColor} />} />
    </Routes>
  )
}

export default AppRoutes
