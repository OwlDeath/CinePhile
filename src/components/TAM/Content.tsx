import { useEffect, useRef, useState } from "react"
import popularStore, { selectPopularMovies, selectPopularTvs } from "../../store/popularStore"
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
import { imageMini } from "../../store/url";
import { MovieAndTv, PopularState } from "../../types/types";
import ItemBlock from "../ItemBlock/ItemBlock";
// import genresStore, { selectMoviesGenres, selectTvsGenres } from "../../store/genresStore";

interface contentProps {
  type: string
}
const Content: React.FC<contentProps> = ({ type }) => {
  const fetchPopular = popularStore(
    (state:PopularState) => state.fetchPopular
  )
  // const fetchGenres = genresStore(
    // (state) => state.fetchGenres
  // )
  const isMounted = useRef<boolean>(false)
  const popularMovies = popularStore(selectPopularMovies)
  const popularTvs = popularStore(selectPopularTvs)
  // const moviesGenres = genresStore(selectMoviesGenres)
  // const tvsGenres = genresStore(selectTvsGenres)
  useEffect(() => {
    if (isMounted.current) {
      fetchPopular(type, 1)
    }
    isMounted.current = true
  }, [isMounted.current])
  const [media, setMedia] = useState<MovieAndTv | null>(null)
  const [active, setActive] = useState<boolean>(false)
  const getMedia = (type:string, item:MovieAndTv) => {
    setMedia(null)
    if(type === 'movie'){ 
      setMedia(item)
    }
    else{
      setMedia(item)
    }
    setActive(true)
  }
  const closeItemBlock = () => {
    setActive(false)
    setMedia(null)
  }
  return (
    <>
    <section className="media">
      <h2>
        <a href="" className="media-title">
          {type === 'movie' ? 'Фильмы' : 'Сериалы'}
          <i className="fa-solid fa-chevron-right"></i>
        </a>
      </h2>
      <Splide 
        className="media__slider"
        options={{
          type: 'loop',
          perPage: 5.5,
          perMove: 1,
          pagination: false,
          gap: '24px',
          autoplay: true
        }}
      >
        { isMounted.current && (
          <>
            {type === 'movie' ? popularMovies?.map((item:MovieAndTv, idx:number) => (
              <SplideSlide className="media__slider-item" onClick={() => getMedia(type, item)} key={idx}>
                <img src={imageMini + item.poster_path} alt="" />
              </SplideSlide>
            )) : popularTvs?.map((item:MovieAndTv, idx:number) => (
              <SplideSlide className="media__slider-item" onClick={() => getMedia(type, item)} key={idx}>
                <img src={imageMini + item.poster_path} alt="" />
              </SplideSlide>
            ))}
          </>
        )}
      </Splide>
      <ItemBlock 
        type={type}
        media={media}
        active={active}
        close={closeItemBlock}
        // moviesGenres={moviesGenres}
        // tvGenres={tvsGenres}
      />
    </section>
    </>
  )
}

export default Content