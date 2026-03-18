<template>
  <div v-if="!isOnline" class="offline-banner">
    
    <video
      autoplay
      muted
      loop
      playsinline
      class="offline-video"
    >
      <source src="videos/offline.mp4" type="video/mp4" />
    </video>

    <p>Você está offline 😢</p>
    <small>Tentando reconectar...</small>

  </div>
</template>

<script setup>
import { useOnlineStatus } from '@/composables/useOnlineStatus';

const { isOnline } = useOnlineStatus();
</script>

<style scoped>
.offline-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.5)
  );

  backdrop-filter: blur(6px);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 9999;

  animation: fadeIn 0.3s ease;
}

.offline-video {
  width: 280px;
  max-width: 80%;
  border-radius: 12px;
  opacity: 0.95;
}

.offline-banner p {
  color: white;
  margin-top: 14px;
  font-size: 16px;
}

.offline-banner small {
  color: #ccc;
  margin-top: 6px;
  font-size: 13px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>