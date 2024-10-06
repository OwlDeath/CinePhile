import BtnMore from "../UI/BtnMore"
import Close from 'images/Close.svg'
import { MovieAndTv } from "../../types/types"
import { imageFull } from "../../store/url"
import Actors from "../Actors/Actors"
interface genres {
  id: number,
  name: string,
  length: number
}
interface ItemBlockProps {
  type: string,
  media: MovieAndTv | null,
  active: boolean,
  close: () => void,
  moviesGenres: genres,
  tvsGenres: genres,
}
const ItemBlock:React.FC<ItemBlockProps> = ({ type, media, active, close }) => {
  return (
    <div className={`media__info ${active && 'active'}`}>
      <img src={Close} alt="" className="close" onClick={close} />
      { media &&
        <div className="media__info-content">
          <div className="media__info-content-block">
            <h2>{media.title ?? media.name}</h2>
            <p>{media.overview ? media.overview : 'Меня забыли описать((('}</p>
            <span>{ 
              new Date(media.release_date).getFullYear() ||
              new Date(media.first_air_date).getFullYear()}
            </span>
            <Actors type={type} media={media} count={4}/>
            <BtnMore  type={type} id={media.id}/>
          </div>
          <img src={imageFull + media.backdrop_path} alt="" />
        </div>
      }
    </div>
  )
}

export default ItemBlock