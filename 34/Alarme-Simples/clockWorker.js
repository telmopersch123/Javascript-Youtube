// clockWorker.js
self.onmessage = function (e) {
  const interval = e.data.interval || 1000; // Define o intervalo padrão para 1 segundo.
  
  // Atualiza o relógio em intervalos regulares.
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Envia o horário atualizado de volta para o script principal.
    self.postMessage({ hours, minutes, seconds });
  }, interval);
};
