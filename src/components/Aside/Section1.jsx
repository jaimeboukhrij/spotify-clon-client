import { Link } from 'react-router-dom'
import styles from './aside.module.css'
import { useContext } from 'react'
import { SearchContext } from '../../contexts/search.context'

export function Section1 ({ spanHover, setSpanHover }) {
  const { setQuery } = useContext(SearchContext)
  return (
    <section className={styles.section1}>
      <article className={styles.article}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <div
            onMouseEnter={() => setSpanHover({ ...spanHover, home: true })}
            onMouseLeave={() => setSpanHover({ ...spanHover, home: false })}
          >
            <span>
              <box-icon
                name='home-alt-2'
                color={spanHover.home ? 'white' : '#a7a7a7'}
                size='27px'
                className='homeIcon'
              />
            </span>
            <p>Inicio</p>
          </div>
        </Link>
        <Link
          to='/search' style={{ textDecoration: 'none' }}
          onClick={() => setQuery('')}
        >
          <div
            onMouseEnter={() => setSpanHover({ ...spanHover, search: true })}
            onMouseLeave={() => setSpanHover({ ...spanHover, search: false })}
          >
            <span>
              <box-icon
                name='search'
                color={spanHover.search ? 'white' : '#a7a7a7'}
                size='27px'
              />
            </span>
            <p>Buscar</p>
          </div>
        </Link>
      </article>
    </section>
  )
}
