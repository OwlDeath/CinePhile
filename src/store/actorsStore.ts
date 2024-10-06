import { create } from "zustand";
import {apiKey, apiUrl} from './url'
import axios from "axios";
import { ActorsState } from "../types/types";

const actorsStore = create<ActorsState>((set) => ({
    moviesActors: null,
    tvsActors: null,
    fetchActors: async (type, id, count) => {
        try {
            const url = `${apiUrl}${type}/${id}/credits?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            let actors = response.data.cast.slice(0, count)
            if(type === 'movie') set({ moviesActors: actors })
            else set({ tvsActors: actors})
        } catch (error) {
            console.error('Произошла ошибка в Actors', error);
        }
    }
}))
export const selectMoviesActors = (state:ActorsState) => state.moviesActors
export const selectTvsActors = (state:ActorsState) => state.tvsActors
export default actorsStore