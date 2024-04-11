export function secondsToMinute (segundosTotal) {
  segundosTotal = segundosTotal / 1000
  const minutos = Math.floor(segundosTotal / 60)
  const segundos = Math.floor(segundosTotal % 60)
  return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`
}
