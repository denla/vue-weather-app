<script setup>
import {
  Sun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-vue-next";

const conditionIcons = {
  Ясно: Sun,
  Солнечно: Sun,
  Пасмурно: Cloud,
  Облачно: Cloud,
  Дождь: CloudRain,
  "Небольшой дождь": CloudRain,
  "Небольшой ливневый дождь": CloudRain,
  "Слабая морось": CloudRain,
  "Умеренный дождь": CloudRain,
  "Местами дождь": CloudRain,
  "Переменная облачность": CloudDrizzle,
  "Местами грозы": CloudLightning,
  Снег: CloudSnow,
};

defineProps({
  time: String,
  condition: String,
  temp: String,
});
</script>

<template>
  <div class="forecast-hourly__item">
    <div class="forecast-hourly__time">{{ time }}</div>
    <component :is="conditionIcons[condition]" :size="32" />
    <div class="forecast-hourly__temp">{{ Math.round(temp) }}°</div>
  </div>
</template>

<style scoped>
.forecast-hourly__item {
  width: 100px;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  text-align: center;
  justify-content: center;
  gap: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  font-size: 14px;
}

.forecast-hourly__title {
  padding: 20px;
}
</style>
