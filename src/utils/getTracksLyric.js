export const getTracksLyrics = (songName = '1000cosas', setState) => {
  const token = 'Nwq2Nb8B3FK2lyHeI1VhfYuCFdI1toob8pF44CTspGguM_vz3NJtbr-rmyqUdoYi'

  fetch(`https://api.genius.com/search?q=${songName}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
    // Manejar los datos de respuesta y extraer las letras de la canción
    // Por ejemplo:
      const lyrics = data.response.hits[0].result.lyrics
      setState(lyrics)
    })
    .catch(error => {
    // Manejar errores
      console.error('Error fetching lyrics:', error)
    })
}
