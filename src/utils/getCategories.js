import newSpotifyService from '../services/spotify.service'
import { globalsBG } from '../constants'

const getCategories = (setEstate, limit) => {
  newSpotifyService.getAllCategorys(0)
    .then(({ data }) => {
      const categories = data.categories.items.map(elem => ({
        name: elem.name,
        urlImg: elem.icons[0].url,
        id: elem.id,
        bgColor: globalsBG[Math.floor(Math.random() * 8)]
      }))
      return categories
    })
    .then(categories => {
      return newSpotifyService.getAllCategorys(50)
        .then(({ data }) => {
          const additionalCategories = data.categories.items.map(elem => ({
            name: elem.name,
            urlImg: elem.icons[0].url,
            id: elem.id,
            bgColor: globalsBG[Math.floor(Math.random() * 8)]
          }))
          return [...categories, ...additionalCategories]
        })
    })
    .then(finalData => {
      setEstate(finalData.slice(2, finalData.length))
    })
    .catch(error => {
      console.error('Error al obtener las categorías:', error)
    })
}

export default getCategories
