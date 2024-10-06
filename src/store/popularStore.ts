import { create } from "zustand";
import {apiKey, apiUrl} from './url'
import axios from "axios";
import {  PopularState } from "../types/types";


const popularStore = create<PopularState>((set) => ({
    popularMovies: null,
    popularTvs: null,
    fetchPopular: async (type, currentPage = 1) => {
        try {
            const url = `${apiUrl}${type}/popular?language=ru-RU&api_key=${apiKey}&page=${currentPage}&adult=false`
            const response = await axios.get(url)
            if(type === 'movie') set({ popularMovies: response.data.results })
            else set({ popularTvs: response.data.results })
            
        } catch (error) {
            console.error('Произошла ошибка в Popular', error);
        }
    }
}))
export const selectPopularMovies = (state:PopularState) => state.popularMovies
export const selectPopularTvs    = (state:PopularState) => state.popularTvs
export default popularStore