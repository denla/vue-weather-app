<script setup>
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
const formatDate = (dateStr) => dayjs(dateStr).format("D MMMM, HH:mm");

import { useFavouritesStore } from "../../stores/favourites";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const favourites = useFavouritesStore();

const props = defineProps({
  data: Object,
});

const goToCity = (city) => {
  favourites.changeCurrentCity(city);
  router.push("/");
};

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
  if (!props.data?.current) return {};
  const condition = props.data.current.condition.text;
  return {
    background:
      conditionBackgrounds[condition] ||
      "linear-gradient(180deg, #3c7fc5, #7db0d5)",
  };
});
</script>

<template>
  <div
    class="cities-card"
    :style="backgroundStyle"
    @click="goToCity(props.data.location.name)"
  >
    <div class="cities-card-col">
      <div>
        <div class="cities-card-name">{{ props.data.location.name }}</div>
        <div class="cities-card-time">
          {{ formatDate(props.data.location.localtime) }}
        </div>
      </div>
      <div class="cities-card-condition">
        {{ props.data.current.condition.text }}
      </div>
    </div>
    <div class="cities-card-col">
      <div class="cities-card-t">
        {{ Math.round(props.data.current.temp_c) }}°
      </div>
      <div class="cities-card-temp">
        ощущ.: {{ Math.round(props.data.current.feelslike_c) }}°
      </div>
    </div>
  </div>
</template>

<style scoped>
.cities-card {
  border-radius: 16px;
  padding: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  height: 140px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.cities-card:hover {
  transform: scale(1.02);
}
.cities-card-name {
  font-size: 24px;
  font-weight: 500;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.cities-card-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.cities-card-t {
  text-align: right;
  font-size: 48px;
  font-weight: 300;
}
</style>
