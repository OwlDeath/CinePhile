import { create } from "zustand";
import {apiKey, apiUrl} from './url'
import axios from "axios";
import { TopRatedState } from "../types/types";

const topRatedStore = create<TopRatedState>((set) => ({
    topRated: null,
    fetchTopRated: async () => {
        try {
            const url = `${apiUrl}movie/top_rated?language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            let res = response.data.results
            let top = []
            for (let i = 0; i <= 9; i++) {
                top.push(res[i])
            }
            set({ topRated: top })
        } catch (error) {
            console.error('Произошла ошибка в TopRated', error);
        }
    }
}))
export const selectTopRated= (state:TopRatedState) => state.topRated
export default topRatedStore