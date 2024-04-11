import { useEffect, useState } from 'react'

export function UseFormSingUp () {
  const [passwordConditions, setPasswordConditions] = useState({
    hasLetter: false,
    hasSpecialNumber: false,
    hasTenCaracteres: false
  })

  const [validEmail, setValidEmail] = useState(true)
  const [validDate, setValidDate] = useState(false)
  const [query, setQuey] = useState({
    email: '',
    password: '',
    date: { day: '', month: '', year: '' },
    profileName: '',
    gender: ''
  })
  const [focus, setFocus] = useState({
    email: false,
    password: false,
    profileName: false,
    day: false,
    month: false,
    year: false
  })

  const [part, setPart] = useState(1)
  useEffect(() => {
    verifyPassword(query.password)
    verifyEmail(query.email)
  }, [part, query])

  const verifyPassword = (string) => {
    setPasswordConditions(prevState => ({
      ...prevState,
      hasLetter: string?.length > 0,
      hasSpecialNumber: /[0-9#?!&]/.test(string),
      hasTenCaracteres: string?.length >= 10
    }))
  }

  const verifyEmail = (string) => {
    if (string === '') {
      setValidEmail(true)
    } else {
      setValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string))
    }
  }
  const dateConditions = (date) => {
    if (date.day === '' || date.month === '' || date.year === '' || date.year.length < 4) {
      return false
    } else {
      return true
    }
  }

  return {
    query,
    setQuey,
    verifyPassword,
    passwordConditions,
    verifyEmail,
    validEmail,
    part,
    setPart,
    focus,
    setFocus,
    validDate,
    setValidDate,
    dateConditions
  }
}
