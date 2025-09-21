<script setup>
import { useUIStore } from "../../stores/ui";
import { RouterLink } from "vue-router";
import { House, Heart, MenuIcon } from "lucide-vue-next";

const ui = useUIStore();
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar--hidden': ui.isSidebarHidden }">
    <div class="sidebar__item" @click="ui.toggleSidebar">
      <MenuIcon :size="20" />
      <div class="sidebar__item-title">Меню</div>
    </div>

    <RouterLink to="/">
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item--active': $route.path === '/' }"
      >
        <House :size="20" />
        <div class="sidebar__item-title">Главная</div>
      </div>
    </RouterLink>

    <RouterLink to="/favorites">
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item--active': $route.path === '/favorites' }"
      >
        <Heart :size="20" />
        <div class="sidebar__item-title">Избранное</div>
      </div>
    </RouterLink>
  </div>
</template>

<style>
.sidebar {
  transition: 0.2s ease;
  width: 350px;
  padding: 8px;
  box-sizing: border-box;
  height: 100vh;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  /* display: none; */
}
.sidebar__item {
  padding: 12px;
  border-radius: 50px;
  color: white;
  transition: 0.15s ease;
  cursor: pointer;
  display: flex;
  gap: 8px;
  user-select: none;
  cursor: pointer;
}
.sidebar__item--active {
  background: rgba(255, 255, 255, 0.15) !important;
}
.sidebar__item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.sidebar__item-title {
  transition: 0.2s ease;
}
.sidebar__item svg {
  flex-shrink: 0;
}
.sidebar--hidden .sidebar__item-title {
  opacity: 0;
}
.sidebar--hidden {
  width: 60px;
}
</style>
