if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(function(registration){
            console.log('Service Worker registered successfully', registration);
        })
        .catch(function(err) {
            console.log('Error registering the service worker', err);
        });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
            console.log('Error al registrar el Service Worker:', error);
        });
}

if (Notification.permission === "default" || Notification.permission === "denied") {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notificaciones permitidas");
        } else {
            console.log("Notificaciones bloqueadas");
        }
    });
}
