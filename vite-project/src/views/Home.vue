<script setup>
import { Cloud, Heart } from "lucide-vue-next";
import HourlyForecastItem from "../components/Items/HourlyForecastItem.vue";
import { RouterLink, RouterView } from "vue-router";

import { ref, onMounted } from "vue";
import axios from "axios";
import DailyForecastItem from "../components/Items/DailyForecastItem.vue";
import Button from "../components/Button/Button.vue";

const API_KEY = "d9dd4da512dc4dba90e205951251509";

import { useFavouritesStore } from "../stores/favourites";

const store = useFavouritesStore();

// const data = ref(null);
const forecast = ref(null);
const loading = ref(false);
const city = ref(store.currentCity);

const suggestions = ref([]);
const showSuggestions = ref(false);

const fetchForecast = async () => {
  try {
    loading.value = true;
    const res = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city.value}&lang=ru&days=7`
    );
    forecast.value = res.data;
    console.log(res.data);
  } catch (err) {
    console.error("Ошибка загрузки прогноза:", err);
  } finally {
    loading.value = false;
  }
};

const addCity = () => {
  store.addFavourite(city.value);
};

onMounted(fetchForecast);

import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
const formatDate = (dateStr) => dayjs(dateStr).format("D MMMM, HH:mm");

import { computed } from "vue";
const conditionBackgrounds = {
  Ясно: "linear-gradient(180deg, #3c7fc5, #a1cceb)",
  Солнечно: "linear-gradient(180deg, #3c7fc5, #a1cceb)",
  Пасмурно: "linear-gradient(rgb(130 149 168), rgb(109 128 148))",
  Облачно: "linear-gradient(180deg, #3c7fc5, #a1cceb)",
  Дождь: "linear-gradient(rgb(130 149 168), rgb(109 128 148))",
  "Местами дождь": "linear-gradient(rgb(130 149 168), rgb(109 128 148))",
  "Переменная облачность": "linear-gradient(180deg, #3c7fc5, #a1cceb)",
  Снег: "linear-gradient(180deg, #3c7fc5, #a1cceb)",
};

const backgroundStyle = computed(() => {
  if (!forecast.value) return {};
  const condition = forecast.value.current.condition.text;
  return {
    background:
      conditionBackgrounds[condition] ||
      "linear-gradient(180deg, #3c7fc5, #a1cceb)",
  };
});
</script>

<template>
  <div v-if="!forecast">Loading...</div>
  <div v-else class="content" :style="backgroundStyle">
    <div class="top">
      <div class="top__header">
        <div class="top__title">{{ forecast.location.name }}</div>
        <div class="top__subtitle">
          Обновлено {{ formatDate(forecast.current.last_updated) }}
        </div>
        <Button type="secondary" @click="store.toggleFavourite(city)">
          <!-- <button @click="store.toggleFavourite(city)"> -->
          <Heart :size="16" />
          <div v-if="store.favourites.includes(city)">
            Удалить из избранного
          </div>
          <div v-else>В избранное</div>
        </Button>

        <!-- </button> -->
      </div>

      <div class="top__info">
        <div class="top__temp">
          {{ Math.round(forecast.current.temp_c) }} °C
        </div>
        <div class="top__condition">
          {{ forecast.current.condition.text
          }}<span class="top__feelslike"
            >Ощущается как
            {{ Math.round(forecast.current.feelslike_c) }} °C</span
          >
        </div>
      </div>
    </div>

    <div class="forecast-hourly">
      <div class="forecast-hourly__title">Почасовой прогноз</div>

      <div class="forecast-hourly__list">
        <HourlyForecastItem
          :time="hour.time.split(' ')[1]"
          :condition="hour.condition.text"
          :temp="hour.temp_c"
          v-for="hour in forecast.forecast.forecastday[0].hour"
          :key="hour.time"
        />
      </div>
    </div>

    <div class="forecast-daily">
      <DailyForecastItem
        v-for="day in forecast.forecast.forecastday"
        :key="day.date"
        :day="day.date"
        :condition="day.day.condition.text"
        :temp_max="day.day.maxtemp_c"
        :temp_min="day.day.mintemp_c"
      />
    </div>
  </div>
</template>

<style scoped>
/* button {
  padding: 12px 20px;
  border-radius: 50px;
  color: black;
  transition: 0.15s ease;
  cursor: pointer;
  width: fit-content;
  border: 0;
  background: white;
  display: flex;
  gap: 8px;
} */

/* .app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
} */

/* .app__main {
  background: linear-gradient(180deg, #3c7fc5, #a1cceb);
  width: 100%;
  height: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: row;
} */

.content {
  overflow-y: auto;
  background: linear-gradient(180deg, #3c7fc5, #a1cceb);
}

/* Top section */
.top {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top__info {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.top__header {
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.top__temp {
  font-size: 64px;
}

.top__condition {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.top__feelslike {
  opacity: 0.6;
}

/* Hourly forecast */
.forecast-hourly {
  display: flex;
  flex-direction: column;
  margin: 20px;
  border-radius: 16px;
  background: #0000001a;
}
.forecast-hourly__title {
  padding: 20px;
  opacity: 0.6;
}

.forecast-hourly__list {
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-y: auto;
  padding: 20px;
  padding-top: 0px;
}

/* Daily forecast */
.forecast-daily {
  display: flex;
  flex-direction: column;
  margin: 20px;
  background: #0000001a;
  border-radius: 16px;
}

.top__subtitle {
  opacity: 0.6;
}
</style>
