import { ref, onMounted, onUnmounted } from 'vue';

const HEARTBEAT_INTERVAL = 10000; // 10s
const FETCH_TIMEOUT = 5000; // 5s

export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine);
  let intervalId = null;

  function updateStatus() {
    isOnline.value = navigator.onLine;
    console.log('Evento navegador:', isOnline.value);
  }

  async function checkConnectivity() {
    console.log('Verificando conexão...');

    // Se o navegador já detecta offline
    if (!navigator.onLine) {
      console.log('Sem internet (navigator)');
      isOnline.value = false;
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

      // Usa um arquivo que SEMPRE existe
      await fetch(`/favicon.ico?_=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('Conexão OK');
      isOnline.value = true;
    } catch (error) {
      console.log('Falha na conexão', error);
      isOnline.value = false;
    }
  }

  onMounted(() => {
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    // checagem inicial
    checkConnectivity();

    // heartbeat
    intervalId = setInterval(checkConnectivity, HEARTBEAT_INTERVAL);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateStatus);
    window.removeEventListener('offline', updateStatus);

    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return { isOnline };
}