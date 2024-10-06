import { create } from "zustand";
import {apiKey, apiUrl} from './url'
import axios from "axios";


const currentStore = create((set) => ({
    currentMovie: null,
    currentTv: null,
    fetchCurrent: async (type, id) => {
        try {
            const url = `${apiUrl}${type}/${id}?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            set({ currentMovie: null, currentTv: null })
            if(type === 'movie') set({ currentMovie: response.data })
            else set({ currentTv: response.data })
        } catch (error) {
            console.error('Произошла ошибка в Current', error);
        }
    }
}))
export const selectCurrentMovie = (state) => state.currentMovie
export const selectCurrentTv    = (state) => state.currentTv
export default currentStore