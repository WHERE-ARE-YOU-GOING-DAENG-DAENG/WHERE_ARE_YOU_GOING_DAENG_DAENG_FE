import { create } from "zustand";
import axios from "axios";
import { genderOptions, petSizeOptions, petTypeOptions } from "../data/CommonCode";

const usePetStore = create((set) => ({
  pets: [], // 펫 리스트 > 리뷰 등록에서 사용
  petInfo: null,
  isLoading: false,
  error: null,

  fetchPetList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("https://www.daengdaeng-where.link/api/v1/pets", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("API 응답 데이터:", response.data.data);
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
        `https://www.daengdaeng-where.link/api/v1/pets/${petId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const petData = response.data.data;
      console.log("API로부터 가져온 펫 데이터:", petData); 
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
