import { create } from "zustand";
import {apiKey, apiUrl} from './url'
import axios from "axios";

const searchStore = create((set) => ({
    data: null,
    fetchData: async (query:string) => {
        try {
            const url = `${apiUrl}search/multi?query=${query}&include_adult=false&language=ru-RU&api_key=${apiKey}`
            const response = await axios.get(url)
            console.log(response);
            set({ data: response.data.results })
        } catch (error) {
            console.error('Произошла ошибка в Search', error);
        }
    }
}))
export const selectData = (state) => state.data
export default searchStore