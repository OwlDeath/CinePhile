import { useEffect, useRef, useState } from "react"
import searchStore, { selectData } from "../store/searchStore"
import { Link } from "react-router-dom"
import { imageMini } from "../store/url"
import { MovieAndTv } from "../types/types"

const Search = () => {
  const [query, setQuery] = useState<string>('')
  const isMounted = useRef<boolean>(false)
  const fetchData = searchStore(
    (state) => state.fetchData
  )
  const data = searchStore(selectData)
  useEffect(() => {
    if (isMounted.current) {
      fetchData(query)
    }
    isMounted.current = true
  }, [query, isMounted.current])

  return (
    <div className="container search">
      <input value={query} type="search" placeholder="Найти фильм, сериал..." onChange={(e) => setQuery(e.target.value)} />
      <div className="search__content">
        {data?.map((item:MovieAndTv, idx:number) => (
          <Link to={`/${item.title ? 'movie' : 'tv'}/${item.id}`} className="search__content-card" key={idx}>
            <img src={imageMini + item.poster_path} alt={item.name} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Search