export async function getSpotifyToken () {
  const formData = new URLSearchParams()
  formData.append('grant_type', 'client_credentials')
  formData.append('client_id', '119951d79c7248b7b50b49ceddef11ff')
  formData.append('client_secret', '1adf29543d5641578d43d993c9da5dfa')

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error al obtener el token de Spotify:', error))
}
