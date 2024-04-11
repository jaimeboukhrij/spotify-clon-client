import { useState } from 'react'
import { getTrackInfo } from '../utils/getTrackInfo'

export function useTrackPlaying () {
  const [trackPlaying, setTrackPlaying] = useState()
  const updateTrackPlaying = (idTrack) => {
    getTrackInfo(idTrack, setTrackPlaying)
  }
  return {
    trackPlaying,
    setTrackPlaying,
    updateTrackPlaying
  }
}
