<script setup>
defineProps({
  type: String,
});

const variants = {
  primary: {
    background: "white",
    color: "black",
  },
  secondary: {
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
  },
  success: {
    background: "green",
    color: "white",
  },
};
</script>

<template>
  <button
    class="button"
    :style="{
      background: variants[type]?.background || 'white',
      color: variants[type]?.color || 'black',
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
/* .button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
} */

button {
  padding: 12px 20px;
  border-radius: 50px;
  color: black;
  transition: 0.15s ease;
  cursor: pointer;
  width: fit-content;
  border: 0;
  /* background: white; */
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  white-space: nowrap;
  height: fit-content;
}
</style>
