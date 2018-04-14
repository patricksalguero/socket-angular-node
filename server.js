var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8000;

var allusers = []

app.use(express.static(path.join(__dirname, "dist")));

io.on('connection', (socket) => {
    
    console.log('Conexion entrante ID: ' + socket.id );
    allusers.push(socket.id)
    console.log('Listado actual' , allusers )

    // console.log(io.sockets)

    socket.on('event1', (data) => {
        console.log("Evento 1" , data.msg);
    });

    socket.emit('event2', {
        msg: 'Evento' + 'Mensaje desde el servidor.'
    });

    socket.on('event3', (data) => {
        console.log(data.msg);
        socket.emit('event4', {
            msg: 'Loud and clear :)'
        });
    });

    
    socket.emit('message-received',[{
        title: 'Mensaje1',
        autor: 'Patrick Salguero'
    }, {
        title : 'Mensaje2',
        autor : 'Marcelino Salguero'
    }])


    socket.on('psalguero', (data) => {
        console.log('Recibiendo en psalguero: ' + JSON.stringify(data) )
        socket.emit('psalguero', { message: 'Esto recibi el servidor: ' , data: data })
    })

    socket.on('disconnect', () => {
        console.log('Desconectandose cliente' , socket.id )
        allusers.splice(allusers.indexOf(socket.id), 1);
        console.log('Listado actualizado: ' + ((allusers.length == 0 ) ? 'No hay conecados' : allusers ) )
    })

});

server.listen(port, () => {
    console.log("Listening on port " + port);
});