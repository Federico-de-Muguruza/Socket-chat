const { io } = require('../server');
const User = require('../classes/users');
const {createMessage} = require('../utils/utils');

const users = new User();

io.on('connection', (client) => {

    client.on('joinChat', (user, callback) => {

        if ( ! user.name || ! user.room) {
            return callback({
                error: true,
                msg: 'El nombre y la sala son necesarios'
            });
        }

        client.join(user.room);

        users.addPerson(client.id, user.name, user.room);

        client.broadcast.to(user.room).emit('join-chat-message', users.getPersonsByRoom(user.room));
        client.broadcast.to(user.room).emit('create-message', createMessage('Admin', `${user.name} se ha unido al chat`));

        callback(users.getPersonsByRoom(user.room));
    });

    client.on('create-message', (data, callback) => {
        const person = users.getPerson(client.id);
        const msg = createMessage(person.name, data.msg);
        client.broadcast.to(person.room).emit('create-message', msg);
        callback(msg);
    });

    client.on('disconnect', () => {
        const person = users.deletePerson(client.id);
        client.broadcast.to(person.room).emit('create-message', createMessage('Admin', `${person.name} ha abandonado el chat`));
        client.broadcast.to(person.room).emit('join-chat-message', users.getPersonsByRoom(person.room));
    });

    client.on('private-message', (data) => {
        const person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('private-message', createMessage(person.name, data.msg));
    })

});