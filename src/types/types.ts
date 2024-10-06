export interface MovieAndTv {
    title: string,
    name: string,
    overview: string,
    backdrop_path: string,
    poster_path: string,
    release_date: string,
    first_air_date: string,
    genre_ids: number[],
    id: number
}
export interface UpcomingItemProps {
    movie: MovieAndTv,
    next: () => void,
    nextSlide: MovieAndTv
}
export interface UpcomingStateMovies {
    upcoming: MovieAndTv[] | null,
    fetchUpcoming: () => Promise<void>
}

export interface PopularState {
    popularMovies: MovieAndTv[] | null,
    popularTvs: MovieAndTv[] | null,
    fetchPopular: (type:string, currentPage:number) => Promise<void>,
}
export interface Actor {
    name: string,
    profile_path: string
}
export interface ActorsState {
    moviesActors: Actor[] | null,
    tvsActors: Actor[] | null,
    fetchActors: (type:string, id:number, count:number) => Promise<void>,
}
export interface TopRatedState {
    topRated: MovieAndTv[] | null,
    fetchTopRated: () => Promise<void>,
}