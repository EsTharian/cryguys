function socket (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      extraHeaders: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  })

  io.on('connection', (sock) => {
    console.log('A user connected')

    sock.emit('connected', {
      data: 'Socket connected'
    })
  })
}

module.exports = {
  socket
}
