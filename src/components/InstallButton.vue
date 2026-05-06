<template>
  <button v-if="deferredPrompt" @click="installApp" class="install-button">
    Instalar App
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const deferredPrompt = ref(null);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });
});

async function installApp() {
  if (!deferredPrompt.value) return;
  deferredPrompt.value.prompt();
  await deferredPrompt.value.userChoice;
  deferredPrompt.value = null;
}
</script>

<style scoped>
.install-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 16px;
  background-color: #4a90d9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>