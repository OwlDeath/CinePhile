import { create } from "zustand";
import {apiKey, apiUrl} from './url'
import axios from "axios";

const trailerStore = create((set) => ({
    trailerMovie: null,
    trailerTv: null,
    fetchTrailer: async (type, id) => {
        try {
            const url = `${apiUrl}${type}/${id}/videos?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            set({ trailerMovie: null, trailerTv: null })
            if(type === 'movie') set({ trailerMovie: response.data.results[0]?.key })
            else set({ trailerTv: response.data.results[0]?.key })
        } catch (error) {
            console.error('Произошла ошибка в Trailer', error);
        }
    }
}))
export const selectTrailerMovie = (state) => state.trailerMovie
export const selectTrailerTv    = (state) => state.trailerTv
export default trailerStore