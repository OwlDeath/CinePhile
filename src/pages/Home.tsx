import Movies from "../components/TAM/Movies"
import Tvs from "../components/TAM/Tvs"
import TopRated from "../components/TopRated/TopRated"
import Upcoming from "../components/Upcoming/Upcoming"

const Home:React.FC = () => {
  return (
    <main className="main">
      <Upcoming />
      <Movies />
      <Tvs />
      <TopRated />
    </main>
    
  )
}

export default Home