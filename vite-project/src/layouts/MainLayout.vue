<script setup>
import { House, Heart } from "lucide-vue-next";
</script>

<template>
  <div class="app">
    <div class="app__main" :style="$attrs.style">
      <div class="sidebar">
        <RouterLink to="/">
          <div
            class="sidebar__item"
            :class="{ 'sidebar__item--active': $route.path === '/' }"
          >
            <House :size="20" />
            Главная
          </div>
        </RouterLink>
        <RouterLink to="/favorites">
          <div
            class="sidebar__item"
            :class="{ 'sidebar__item--active': $route.path === '/favorites' }"
          >
            <Heart :size="20" />
            Избранное
          </div>
        </RouterLink>
        <!-- <RouterLink to="/search">
          <div
            class="sidebar__item"
            :class="{ 'sidebar__item--active': $route.path === '/search' }"
          >
            Поиск
          </div>
        </RouterLink> -->
      </div>

      <div class="content">
        <!-- Здесь будут страницы -->
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.app__main {
  /* background: linear-gradient(180deg, #3c7fc5, #a1cceb); */
  background: rgb(48, 48, 48);
  width: 1200px;
  height: calc(100% - 100px);
  border-radius: 16px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  display: flex;
  flex-direction: row;
}
.sidebar {
  width: 350px;
  padding: 16px;
  box-sizing: border-box;
}
.sidebar__item {
  padding: 12px;
  border-radius: 50px;
  color: white;
  transition: 0.15s ease;
  cursor: pointer;
  display: flex;
  gap: 8px;
}
.sidebar__item--active,
.sidebar__item:hover {
  background: rgba(255, 255, 255, 0.15);
}
.content {
  width: 100%;
  overflow-y: auto;
}
</style>
