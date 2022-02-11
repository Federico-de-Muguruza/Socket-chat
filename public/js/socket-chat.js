var socket = io();

const params = new URLSearchParams(window.location.search);

if ( ! params.has('name') || ! params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

const user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('joinChat', user, (callback) => {
        // console.log('Usuarios conectados: ', callback);
        usersRender(callback);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// // Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

socket.on('create-message', (msg) => {
    // console.log(msg);
    chatRender(msg, false); 
    scrollBottom();
})

// Escuchar información
socket.on('join-chat-message', (persons) => {
    usersRender(persons);
});

socket.on('private-message', (msg) => {
    console.log(msg);
})