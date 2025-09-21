import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useFavouritesStore = defineStore("favourites", () => {
  const currentCity = ref("Москва");

  // Инициализация из localStorage или дефолт
  const favourites = ref(
    JSON.parse(localStorage.getItem("favourites")) || [
      "Москва",
      "Санкт-Петербург",
      "Лондон",
    ]
  );

  const addFavourite = (city) => {
    if (!favourites.value.includes(city)) {
      favourites.value.push(city);
    }
  };

  const removeFavourite = (city) => {
    favourites.value = favourites.value.filter((c) => c !== city);
  };

  const toggleFavourite = (city) => {
    if (favourites.value.includes(city)) {
      removeFavourite(city);
    } else {
      addFavourite(city);
    }
  };

  const changeCurrentCity = (city) => {
    currentCity.value = city;
  };

  // Сохраняем изменения в localStorage
  watch(
    favourites,
    (newVal) => {
      localStorage.setItem("favourites", JSON.stringify(newVal));
    },
    { deep: true }
  );

  return {
    favourites,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    currentCity,
    changeCurrentCity,
  };
});
