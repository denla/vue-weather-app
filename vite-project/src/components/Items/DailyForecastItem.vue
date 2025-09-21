<script setup>
import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
} from "lucide-vue-next";

defineProps({
  day: String,
  condition: String,
  temp_min: Number,
  temp_max: Number,
});

const conditionIcons = {
  Ясно: Sun,
  Солнечно: Sun,
  Пасмурно: Cloud,
  Облачно: Cloud,
  Дождь: CloudRain,
  "Умеренный дождь": CloudRain,
  "Местами дождь": CloudRain,
  "Переменная облачность": CloudDrizzle,
  Снег: CloudSnow,
};

import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
const formatDate = (dateStr) => dayjs(dateStr).format("D MMMM");
</script>

<template>
  <div class="forecast-daily__item">
    <div class="forecast-daily__date">{{ formatDate(day) }}</div>

    <div class="forecast-daily__condition">
      <component :is="conditionIcons[condition]" :size="20" />
      <div class="forecast-daily__text">{{ condition }}</div>
    </div>

    <div class="forecast-daily__temp">
      <div class="forecast-daily__temp-min">{{ Math.round(temp_min) }}</div>
      <div class="forecast-daily__temp-max">{{ Math.round(temp_max) }}</div>
      °
    </div>
  </div>
</template>

<style scoped>
.forecast-daily__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ffffff3b;
  white-space: nowrap;
}

.forecast-daily__text {
  min-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.forecast-daily__temp {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
.forecast-daily__temp-min {
  opacity: 0.7;
}

.forecast-daily__condition {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 33%;
  white-space: nowrap;
}

.forecast-daily__condition svg {
  flex-shrink: 0;
}
</style>
