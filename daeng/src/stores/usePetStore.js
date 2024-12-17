import { create } from "zustand";
import axios from "axios";
import { genderOptions, petSizeOptions, petTypeOptions } from "../data/CommonCode";

const usePetStore = create((set) => ({
  pets: [],
  petInfo: null,
  isLoading: false,
  error: null,

  fetchPetList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("https://api.daengdaeng-where.link/api/v1/pets", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      set({ pets: response.data.data || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: "펫 리스트를 불러오는 데 실패했습니다." });
      console.error(error);
    }
  },

  fetchPetData: async (petId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://api.daengdaeng-where.link/api/v1/pets/${petId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const petData = response.data.data;
      const speciesOption = petTypeOptions.find((option) => option.name === petData.species);
      const genderOption = genderOptions.find((option) => option.name === petData.gender);
      const sizeOption = petSizeOptions.find((option) => option.name === petData.size);

      set({
        petInfo: {
          name: petData.name,
          birthday: petData.birthday,
          species: speciesOption ? speciesOption.code : "",
          gender: genderOption ? genderOption.code : "",
          neutering: petData.neutering,
          size: sizeOption ? sizeOption.code : "",
          image: petData.image,
        },
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({ isLoading: false, error: "펫 정보를 불러오는 데 실패했습니다." });
      console.error(error);
    }
  },
}));

export default usePetStore;
