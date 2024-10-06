import { Link } from "react-router-dom"
import popularStore, { selectPopularMovies, selectPopularTvs } from "../../store/popularStore"
import { MovieAndTv, PopularState } from "../../types/types"
import { useEffect, useRef, useState } from "react"
import { imageMini } from "../../store/url"
interface MediaProps {
  type: string
}
const Media:React.FC<MediaProps> = ({type}) => {
  const fetchPopular = popularStore(
    (state:PopularState) => state.fetchPopular
  )
  const isMounted = useRef<boolean>(false)
  const popularMovies = popularStore(selectPopularMovies)
  const popularTvs = popularStore(selectPopularTvs)
  const [content, setContent] = useState<null | MovieAndTv[]>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(500)
  useEffect(() => {
    if (isMounted.current) {
      fetchPopular(type, currentPage)
      if(type === 'movie') setContent(popularMovies)
      else setContent(popularTvs) 
    }
    isMounted.current = true
  }, [isMounted.current, fetchPopular, popularMovies, popularTvs])
  const changePage = (dir:string) => {
    if(dir === 'next') setCurrentPage(currentPage+1)
    else setCurrentPage(currentPage-1)
    window.scrollY = 0
    window.scroll(0,0)
  }
  return (
    <section className="container media">
        <h2>Все {type === 'movie' ? 'Фильмы' : 'Сериалы'}</h2>
        <div className="media__content">
          {content?.map((item, idx) => (
            <Link to={`/${type}/${item.id}`} className="media__content-item" key={idx}>
                <img src={imageMini + item.poster_path} alt="" />
            </Link>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => changePage("prev")} disabled={currentPage === 1}>BACK</button>
          <span>Страница {currentPage} - {totalPages}</span>
          <button onClick={() => changePage("next")} disabled={currentPage === totalPages}>NEXT</button>
        </div>
    </section>
  )
}

export default Media