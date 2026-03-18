<template>
  <div v-if="!isOnline" class="offline-banner">
    <video autoplay muted loop id="offline-video">
      <source src="/videos/offline.mp4" type="video/mp4">
    </video>
    <p>Você está offline</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOnline = ref(navigator.onLine);

function updateOnlineStatus() {
  isOnline.value = navigator.onLine;
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus);
  window.removeEventListener('offline', updateOnlineStatus);
});
</script>

<style scoped>
.offline-banner {
  background-color: #e74c3c;
  color: white;
  text-align: center;
  padding: 8px 16px;
  font-size: 0.85rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>