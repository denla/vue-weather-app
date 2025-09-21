<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <div class="weather-card">
    <p>{{ data.maxtemp_c }}°C</p>
    <p>{{ data.condition.text }}</p>
  </div>
</template>

<style scoped>
.weather-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 200px;
  text-align: center;
}
</style>
