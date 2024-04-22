import { ColorExtractor } from 'react-color-extractor'

export default function ColorExtractorComp ({ urlImg, setBgColor }) {
  return (
    <ColorExtractor getColors={colors => setBgColor(colors)}>
      <img src={urlImg} alt='colorImg' style={{ display: 'none' }} />
    </ColorExtractor>
  )
}
