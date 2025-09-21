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
import SearchResultItem from "../components/Items/SearchResultItem.vue";

import { Search } from "lucide-vue-next";
import CityForecastItemLoader from "../components/Skeletons/CityForecastItemLoader.vue";

const cities = useFavouritesStore();

// const cities = ["Москва", "Санкт-Петербург", "Нижний Новгород", "Лондон"];

const forecasts = ref([]);
const loading = ref(false);

const searchQuery = ref("");
const suggestions = ref([]);
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
  router.push("/");
};

onMounted(fetchForecasts);

const formatDate = (dateStr) => dayjs(dateStr).format("D MMMM, HH:mm");
</script>

<template>
  <div class="favourites">
    <h1>Избранные города</h1>

    <div class="search-box">
      <Search class="search-icon" :size="18" />
      <input
        type="text"
        placeholder="Найти город"
        v-model="searchQuery"
        @input="fetchSuggestions"
      />
    </div>

    <div v-if="loading">
      <div class="cities-list">
        <CityForecastItemLoader /><CityForecastItemLoader /><CityForecastItemLoader />
      </div>
    </div>
    <div v-else>
      <!-- <input
        type="text"
        placeholder="Добавить город"
        v-model="searchQuery"
        @input="fetchSuggestions"
      /> -->

      <div v-if="!suggestions.length">
        <div class="cities-list">
          <CityForecastItem
            v-for="f in forecasts"
            :key="f.location.name"
            :data="f"
          />
        </div>
      </div>

      <div v-else class="suggestions">
        <!-- <li
          v-for="s in suggestions"
          :key="s.id"
          @click="goToCity(s.name)"
          class="suggestion-item"
        >
          {{ s.name }} <span v-if="s.country">({{ s.country }})</span>
        </li> -->

        <SearchResultItem
          v-for="s in suggestions"
          :key="s.id"
          :handle-click="goToCity"
          :name="s.name"
          :country="s.country"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.favourites {
  padding: 20px;
}
.cities-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
@media screen and (max-width: 1080px) {
  .cities-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 880px) {
  .cities-list {
    grid-template-columns: 1fr;
  }
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
  /* border: 1px solid #ccc; */
  border-radius: 8px;
  /* background: white; */
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.search-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  left: 16px;
  top: 12px;
}

.search-box input {
  width: 100%;
  padding: 12px 12px 12px 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-box input:focus {
  background: rgba(255, 255, 255, 0.2);
}
</style>
