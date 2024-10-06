import { useEffect, useRef } from "react"
import actorsStore, { selectMoviesActors, selectTvsActors } from "../../store/actorsStore"
import { MovieAndTv } from "../../types/types"
import { imageMini } from "../../store/url"

interface actorsProps {
  type: string,
  media: MovieAndTv,
  count: number
}
const Actors: React.FC<actorsProps> = ({ type, media, count }) => {
  const fetchActors = actorsStore(
    (state) => state.fetchActors
  )
  const moviesActors = actorsStore(selectMoviesActors)
  const tvsActors = actorsStore(selectTvsActors)
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      fetchActors(type, media.id, count)
    }
    isMounted.current = true
  }, [isMounted.current, media])

  return (
    <div className="actors">
      {type === 'movie' ? moviesActors?.map((item, idx:number) => (
        <div className="actors__item" key={idx}>
          <img src={imageMini + item.profile_path} alt="" />
          <h3>{item.name}</h3>
        </div>
      )) : tvsActors?.map((item, idx:number) => (
        <div className="actors__item" key={idx}>
          <img src={imageMini + item.profile_path} alt="" />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default Actors