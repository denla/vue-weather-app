<script setup>
const fetchSuggestions = async () => {
  if (city.value.length < 2) {
    suggestions.value = [];
    return;
  }
  try {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${store.currentCity}`
    );
    suggestions.value = res.data;
    showSuggestions.value = true;
  } catch (err) {
    console.error("Ошибка загрузки подсказок:", err);
  }
};
</script>

<template>
  <div class="city-search">
    <input
      v-model="city"
      @input="fetchSuggestions"
      @keyup.enter="fetchForecast"
      class="city-search__input"
      placeholder="Введите город..."
    />
    <button class="city-search__btn" @click="fetchForecast">Обновить</button>
  </div>
</template>
