<!-- <script setup>
import { computed } from "vue";

const props = defineProps({
  uv: { type: Number },
});

const maxUv = 11;

const percent = computed(() => Math.min((props.uv / maxUv) * 100, 100));

const color = computed(() => {
  if (props.uv <= 2) return "#4caf50";
  if (props.uv <= 5) return "#ffeb3b";
  if (props.uv <= 7) return "#ff9800";
  if (props.uv <= 10) return "#f44336";
  return "#9c27b0";
});
</script>

<template>
  <div class="uv-card">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <path
        class="circle-bg"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        class="circle"
        :stroke="color"
        :stroke-dasharray="percent + ', 100'"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">{{ uv }}</text>
    </svg>
    <div class="uv-label">УФ-индекс</div>
  </div>
</template>

<style scoped>
.uv-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin: 10px;
}

.circular-chart {
  max-width: 80px;
  max-height: 80px;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 3.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.3s, stroke 0.3s;
}

.percentage {
  fill: #000;
  font-size: 0.5em;
  text-anchor: middle;
  dominant-baseline: central;
  transform: rotate(90deg);
}

.uv-label {
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
}
</style> -->

<script setup>
import { computed } from "vue";

const props = defineProps({
  uv: { type: Number, default: 0 },
});

const maxUv = 11;

const percent = computed(() => Math.min((props.uv / maxUv) * 100, 100));

const color = computed(() => {
  if (props.uv <= 2) return "#4caf50";
  if (props.uv <= 5) return "#ffeb3b";
  if (props.uv <= 7) return "#ff9800";
  if (props.uv <= 10) return "#f44336";
  return "#9c27b0";
});

// Для stroke-dasharray нужно учитывать длину полукруга
const circumference = 50.265; // π * r, если r = 16 (для SVG viewBox 36x36)
const dash = computed(() => (percent.value / 100) * circumference);
</script>

<template>
  <div class="uv-card">
    <svg viewBox="0 0 36 18" class="circular-chart">
      <path
        class="circle-bg"
        d="M2,16 A16,16 0 0,1 34,16"
        fill="none"
        stroke="#eee"
        stroke-width="4"
      />
      <path
        class="circle"
        d="M2,16 A16,16 0 0,1 34,16"
        fill="none"
        stroke-width="4"
        :stroke="color"
        stroke-linecap="round"
        :stroke-dasharray="dash + ',' + circumference"
      />
      <text x="18" y="14" class="percentage">{{ uv }}</text>
    </svg>
    <div class="uv-label">УФ-индекс</div>
  </div>
</template>

<style scoped>
.uv-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  margin: 10px;
}

.circular-chart {
  width: 80px;
  height: 40px;
}

.percentage {
  fill: #000;
  font-size: 0.5em;
  text-anchor: middle;
  dominant-baseline: central;
}

.uv-label {
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
}
</style>
