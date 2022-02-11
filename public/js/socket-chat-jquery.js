const divUsuarios = $('#divUsuarios');
const sendForm = $('#send-form');
const msg = $('#txt-message');
const divChatbox = $('#divChatbox');

const usersRender = (users) => {
    const params = new URLSearchParams(window.location.search);

    console.log(users);

    let html = '';

    html += '<li>';
    html += `<a href="javascript:void(0)" class="active"> Chat de <span>${params.get('room')}</span></a>`;
    html += '</li>';

    users.forEach(user => {
        html += '<li>';
        html += `<a data-id="${user.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${user.name}<small class="text-success">online</small></span></a>`;
        html += '</li>';
    });

    divUsuarios.html(html);
}

const chatRender = (msg, me) => {
    let html = '';
    const date = new Date(msg.date);
    const hour = date.getHours() + ':' + date.getMinutes(); 

    let adminClass = 'info';
    if (msg.name === 'Admin')
        adminClass = 'danger';

    if ( ! me) {
        html += '<li>';
        if (msg.name != 'Admin')
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += `<h5>${msg.name}</h5>`;
        html += `<div class="box bg-light-${adminClass}">${msg.msg}</div>`;
        html += '</div>';
        html += `<div class="chat-time">${hour}</div>`;
        html += '</li>';       
    } else {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += `<h5>${msg.name}</h5>`;
        html += `<div class="box bg-light-inverse">${msg.msg}</div>`;
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += `<div class="chat-time">${hour}</div>`;
        html += '</li>';
    }


    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsuarios.on('click', 'a', function() {
    const id = $(this).data('id');
    if (id)
        console.log(id);
});

sendForm.on('submit', function(e) {
    e.preventDefault();
    
    if (msg.val().trim().length === 0) return;

    // Enviar información
    socket.emit('create-message', {
        usuario: user.name,
        msg: msg.val()
    }, function(message) {
        msg.val('').focus();
        chatRender(message, true); 
        scrollBottom();
    });
});
