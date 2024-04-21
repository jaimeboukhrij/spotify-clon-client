// aside.jsx
import React from 'react'
import styles from './aside.module.css'
import 'boxicons'
import { Section1 } from './Section1'
import { Section2 } from './Section2'
import { UseAside } from '../../hooks/UseAside'
import { Section3 } from './Section3'

export function Aside () {
  const {
    spanHover, setSpanHover, recentlyListened, filterRecentListened,
    filterListened, filterType, setQuery, query, createPlayList, myPlayLists
  } = UseAside()
  return (
    <aside className={styles.aside}>
      <Section1 setSpanHover={setSpanHover} spanHover={spanHover} />
      <Section2
        setSpanHover={setSpanHover} spanHover={spanHover}
        filterRecentListened={filterRecentListened} filterType={filterType}
        createPlayList={createPlayList}
      />
      <Section3
        recentlyListened={recentlyListened} filterListened={filterListened}
        filterType={filterType} setQuery={setQuery} query={query}
        myPlayLists={myPlayLists}
      />
    </aside>
  )
}
