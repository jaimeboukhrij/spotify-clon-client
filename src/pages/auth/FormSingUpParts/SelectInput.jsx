export function SelectInput ({ handleChangeDate, handleBlur, date, focus, query }) {
  return (
    <select
      onChange={handleChangeDate} name='month' onBlur={handleBlur} value={query.month}
      style={{
        boxShadow: (date.month === '' && focus.month) ? 'inset 0 0 0 1px #e91429' : 'none',
        borderColor: (date.month === '' && focus.month) ? 'transparent' : '#ffffff7d'
      }}
    >
      <option value=''>Mes</option>
      <option value='1'>Enero</option>
      <option value='2'>Febrero</option>
      <option value='3'>Marzo</option>
      <option value='4'>Abril</option>
      <option value='5'>Mayo</option>
      <option value='6'>Junio</option>
      <option value='7'>Julio</option>
      <option value='8'>Agosto</option>
      <option value='9'>Septiembre</option>
      <option value='10'>Octubre</option>
      <option value='11'>Noviembre</option>
      <option value='12'>Diciembre</option>
    </select>
  )
}
