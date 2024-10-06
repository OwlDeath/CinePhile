import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
import { useEffect, useRef } from 'react';
import { imageMini } from '../../store/url';
import { MovieAndTv } from '../../types/types';
import topRatedStore, { selectTopRated } from '../../store/topRatedStore';
import { Link } from 'react-router-dom';

const TopRated = () => {
    const fetchTopRated = topRatedStore(
        (state) => state.fetchTopRated
      )
    const isMounted = useRef<boolean>(false)
    const topRated = topRatedStore(selectTopRated)
    useEffect(() => {
        if(isMounted.current){
            fetchTopRated()
        }
        isMounted.current = true
    }, [isMounted.current])
    
  return (
    <section className="top">
        <h2 className="top-title">
            ТОП<span>10</span>
        </h2>
        <Splide 
        className="top__slider"
        options={{
          type: 'loop',
          perPage: 3.5,
          perMove: 1,
          pagination: false,
          gap: '23px',
          autoplay: true
        }}
      >
        { isMounted.current && (
          <>
          { topRated?.map((item:MovieAndTv, idx:number) => (
              <SplideSlide className="top__slider-item" key={idx}>
                <Link to={`/movie/${item.id}`} className='top__slider-item-content'>
                  <img src={imageMini + item.poster_path} alt="" />
                  <div><span>{idx + 1}</span></div>
                </Link>
              </SplideSlide>
            ))}
          </>
        )}
      </Splide>
    </section>
  )
}

export default TopRated