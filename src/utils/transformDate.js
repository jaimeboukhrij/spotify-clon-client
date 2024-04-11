export function transformDate (fechaString) {
  const fecha = new Date(fechaString)
  const ahora = new Date()
  const diferencia = ahora - fecha
  const horas = Math.ceil(diferencia / (1000 * 60 * 60))
  const dias = Math.ceil(horas / 24)
  const meses = Math.floor(dias / 30)
  if (dias > 28) {
    return `${meses} meses`
  } else if (horas > 24) {
    return `${dias} dias`
  } else { return `${horas} horas` }
}
