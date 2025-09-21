<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
</script>

<template>
  <div class="app">
    <div class="app__main" :style="$attrs.style">
      <Sidebar />
      <div class="content">
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
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
}

.content {
  width: 100%;
  overflow-y: auto;
}
</style>
