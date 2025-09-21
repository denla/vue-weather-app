<template>
  <div class="skeleton-wrapper">
    <div class="skeleton-image"></div>
    <!-- <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text short"></div> -->
  </div>
</template>

<style scoped>
.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.skeleton-image {
  animation: shimmer 1.5s infinite linear;

  border-radius: 16px;
  width: 100%;
  height: 140px;
  border-radius: 16px;
}

.skeleton-text {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}

.skeleton-image,
.skeleton-text {
  background: linear-gradient(90deg, #8b8b8b6b 25%, #8b8b8b 50%, #8b8b8b6b 75%);
  background-size: 200% 100%;
}
</style>
