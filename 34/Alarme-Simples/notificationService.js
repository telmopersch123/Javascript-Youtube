
self.addEventListener('notificationclick', function(event) {
    // Fecha a notificação
    event.notification.close();

    // Obtém a aba ou janela ativa
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            // Verifica se há alguma guia aberta
            for (let client of clientList) {
                // Verifica se a guia já está aberta e se a URL corresponde
               if (client.url === 'https://telmopersch123.github.io/Alarme-Simples/') {
                    return client.focus(); // Traz a guia de volta ao primeiro plano
                }
            }
        })
    );
});
