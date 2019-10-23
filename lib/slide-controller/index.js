'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  serverMiddleware({app}) {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    server.listen(1512);

    io.on('connection', function (socket) {
      socket.on('transition', function (data) {
        io.emit('transition-to', data);
      });

      socket.on('reset-time', function(data) {
        io.emit('sync-time', data);
      });

      socket.on('reveal', function () {
        io.emit('reveal-speaker');
      });

      socket.on('play-state', function (data) {
        io.emit('play-state', data);
      });
    });
  }
};
