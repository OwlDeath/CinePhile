import BtnMore from "../UI/BtnMore";
import { imageFull, imageMini } from "../../store/url";
import { UpcomingItemProps } from "../../types/types";

const UpcomingItem:React.FC<UpcomingItemProps> = ({movie, next, nextSlide}) => {
  return (
    <div className="upcoming__item">
        <img src={imageFull + movie.backdrop_path} alt=""/>
        <div className="upcoming__item-content">
            <h1>{movie.title}</h1>
            <p>{movie.overview ? movie.overview : 'Меня забыли добавить...'}</p>
            <BtnMore type="movie" id={movie.id}/>
        </div>
        <div className="upcoming__item-next" onClick={next}>
            <img src={imageMini + nextSlide.backdrop_path} alt="" />
            <div>
                <span>Следующий</span>
                <h3>{nextSlide.title}</h3>
            </div>
            <div className="upcoming__item-next-line"></div>
        </div>
    </div>
  )
}

export default UpcomingItem