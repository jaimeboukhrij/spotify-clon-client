export default function msSecondsToHour (segundosTotal) {
  segundosTotal = segundosTotal / 1000
  const horas = Math.floor(segundosTotal / 3600)
  const minutos = Math.floor((segundosTotal % 3600) / 60)
  return `${horas}h ${minutos} minutos`
}
