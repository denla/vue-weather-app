<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

const API_KEY = "d9dd4da512dc4dba90e205951251509";

import CityForecastItem from "../components/Items/CityForecastItem.vue";
import { useFavouritesStore } from "../stores/favourites";
import router from "../router";

const cities = useFavouritesStore();

// const cities = ["Москва", "Санкт-Петербург", "Нижний Новгород", "Лондон"];

// сюда будем складывать данные по каждому городу
const forecasts = ref([]);
const loading = ref(false);

const searchQuery = ref(""); // строка поиска
const suggestions = ref([]); // подсказки
// const favorites = useFavouritesStore();

const fetchSuggestions = async () => {
  if (searchQuery.value.length < 2) {
    suggestions.value = [];
    return;
  }
  try {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery.value}`
    );
    suggestions.value = res.data;
  } catch (err) {
    console.error("Ошибка загрузки подсказок:", err);
  }
};

const fetchForecasts = async () => {
  loading.value = true;
  try {
    const results = await Promise.all(
      cities.favourites.map((c) =>
        axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${c}&lang=ru`
        )
      )
    );
    forecasts.value = results.map((res) => res.data);
    console.log(results);
  } catch (err) {
    console.error("Ошибка загрузки избранных городов:", err);
  } finally {
    loading.value = false;
  }
};

const goToCity = (city) => {
  cities.changeCurrentCity(city);
  router.push("/"); // Перенаправляем на главную
};

onMounted(fetchForecasts);

const formatDate = (dateStr) => dayjs(dateStr).format("D MMMM, HH:mm");
</script>

<template>
  <div class="favourites">
    <h1>Избранные города</h1>

    <div v-if="loading">Загружаем...</div>
    <div v-else>
      <input
        type="text"
        placeholder="Добавить город"
        v-model="searchQuery"
        @input="fetchSuggestions"
      />

      <div v-if="!suggestions.length">
        <div class="cities-list">
          <CityForecastItem
            v-for="f in forecasts"
            :key="f.location.name"
            :data="f"
          />
        </div>
      </div>

      <ul v-else class="suggestions">
        <li
          v-for="s in suggestions"
          :key="s.id"
          @click="goToCity(s.name)"
          class="suggestion-item"
        >
          {{ s.name }} <span v-if="s.country">({{ s.country }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.favourites {
  padding: 20px;
}
.cities-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  gap: 16px;
}

.cities-list__item {
  border-radius: 16px;
  padding: 14px;
  background: linear-gradient(180deg, #3c7fc5, #7db0d5);
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}
.cities-list__item-name {
  font-size: 24px;
  font-weight: 500;
}
.cities-list__item-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.cities-list__item-t {
  text-align: right;
  font-size: 48px;
  font-weight: 300;
}

.suggestions {
  margin: 12px 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  /* background: white; */
}

.suggestion-item {
  padding: 8px 12px;
  cursor: pointer;
}

.suggestion-item:hover {
  background: #f0f0f0;
}
</style>
