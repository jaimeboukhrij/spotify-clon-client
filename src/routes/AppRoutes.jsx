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
import PrivateRoute from './PrivateRoutes'
import { CreatePlayList } from '../pages/createPlayList/CreatePlayList'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<LogIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Categories />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/album/:idAlbum' element={<Album />} />
        <Route path='/genre/:idGenre' element={<Genre />} />
        <Route path='/playlist/:idPlayList' element={<PlayList />} />
        <Route path='/track/:idTrack' element={<Track />} />
        <Route path='/artist/:idArtist' element={<Artist />} />
        <Route path='/myplaylist/:idPlayList' element={<CreatePlayList />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
