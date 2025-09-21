<script setup>
defineProps({
  name: String,
  country: String,
  handleClick: Function,
});
</script>

<template>
  <div class="suggestion-item" @click="handleClick(name)">
    {{ name }}
    <span v-if="country" class="suggestion-item__country">{{ country }}</span>
  </div>
  <hr />
</template>

<style scoped>
.suggestion-item {
  transition: 0.1s ease;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0px;
  border-radius: 8px;
}
.suggestion-item__country {
  opacity: 0.6;
}

.suggestion-item:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
