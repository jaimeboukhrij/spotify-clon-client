const handleScroll = ({ changeNavColor, setNavFilter, bgColor }, name) => {
  const outerDiv = document.getElementById('playListSection')
  const innerDiv = document.getElementById('allTracksContainer')
  if (!outerDiv || !innerDiv) return
  const outerDivRect = outerDiv.getBoundingClientRect()
  const innerDivRect = innerDiv.getBoundingClientRect()

  if (
    innerDivRect.top >= outerDivRect.top + 60
  ) {
    changeNavColor('transparent')
    setNavFilter(false)
  } else {
    bgColor && changeNavColor(bgColor[0])
    setNavFilter(true)
  }
}

export default handleScroll
