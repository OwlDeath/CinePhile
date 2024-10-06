import { Link, useParams } from "react-router-dom"
import currentStore, { selectCurrentMovie, selectCurrentTv } from "../store/currentStore"
import { useEffect, useRef, useState } from "react"
import { imageMini } from "../store/url"
import trailerStore, { selectTrailerMovie, selectTrailerTv } from "../store/trailerStore"
import Actors from "../components/Actors/Actors"
import recStore, { selectRec } from "../store/recStore"

const Current = () => {
  const { type, id } = useParams()
  const fetchCurrent = currentStore((state) => state.fetchCurrent)
  const movie = currentStore(selectCurrentMovie)
  const tv = currentStore(selectCurrentTv)
  const fetchTrailer = trailerStore((state) => state.fetchTrailer)
  const movieTrailer = trailerStore(selectTrailerMovie)
  const tvTrailer = trailerStore(selectTrailerTv)
  const fetchRec = recStore((state) => state.fetchRec)
  const rec = recStore(selectRec)
  const isMounted = useRef<boolean>(false)
  const [media, setMedia] = useState({ id: 0 })
  useEffect(() => {
    if (isMounted.current) {
      fetchCurrent(type, id)
      fetchTrailer(type, id)
      setMedia({ id: id })
      fetchRec(type, id)
      window.scroll(0,0)
    }
    isMounted.current = true
  }, [isMounted.current, fetchCurrent, type, id])
  const getBudget = () => {
    if (movie) {
      return '$' + movie?.budget.toString().split("").join("").match(/.{1,3}/g).join(",")
    } else {
      return 'Неизвестно...'
    }
  }
  const getRevenue = () => {
    if (movie) {
      return '$' + movie?.revenue.toString().split("").join("").match(/.{1,3}/g).join(",")
    } else {
      return 'Неизвестно...'
    }
  }
  return (
    <>
      <div className="current">
        {isMounted.current && (
          <div className="current__content">
            <img src={imageMini + (movie ? movie?.poster_path : tv?.poster_path)} alt="" className="poster" />
            <img src={imageMini + (movie ? movie?.backdrop_path : tv?.backdrop_path)} alt="" className="backdrop" />
            <h1>{movie?.title ?? tv?.name}</h1>
            <p>{movie?.overview ?? tv?.overview}</p>
            <div>
              <span>{new Date(movie?.release_date).getFullYear() || new Date(tv?.first_air_date).getFullYear()}</span>
              {movie ? movie?.genres?.map((item, idx: number) => (
                <span key={idx}>{item.name},</span>
              )) : tv?.genres?.map((item, idx: number) => (
                <span key={idx}>{item.name},</span>
              ))}
              <span>{movie ?
                `${Math.floor(movie?.runtime / 60)}h ${movie?.runtime % 60}m` :
                `${tv?.number_of_seasons}s ${tv?.number_of_episodes}e`}
              </span>
            </div>
            <a target="_blank" href={`https://www.youtube.com/watch?v=${movieTrailer ?? tvTrailer}`} className="btn-more">
              <i className="fa-solid fa-play"></i>
              Смотреть трейлер
            </a>
            <h4>В главных ролях</h4>
            <Actors type={type} media={media} count={6} />

          </div>
        )}
      </div>
      <div className="container info">
        <ul className="info__list">
          <li>
            <h2>Бюджет</h2>
            <p>{getBudget()}</p>
          </li>
          <li>
            <h2>Сборы</h2>
            <p>{getRevenue()}</p>
          </li>
          <li>
            <h2>Статус</h2>
            <p>{movie?.status ?? tv?.status}</p>
          </li>
          <li>
            <h2>Исходное название</h2>
            <p>{movie?.original_title ?? tv?.original_name}</p>
          </li>
        </ul>
        <div className="info__rec">
          <h2>Рекомендации</h2>
          <div className="media__content">
            {rec?.map((item, idx: number) => (
              <Link to={`/${type}/${item.id}`} className="media__content-item" key={idx}>
                <img src={imageMini + item.poster_path} alt="" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Current