export function numberDateToWriteDate (fechaOriginal) {
  const fecha = new Date(fechaOriginal)
  const opcionesDeFecha = { day: 'numeric', month: 'long', year: 'numeric' }
  return fecha.toLocaleDateString('es-ES', opcionesDeFecha)
}
