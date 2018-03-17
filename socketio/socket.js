import socketEvents from './socketEvents/notification';
var redis = require('socket.io-redis');
import * as cache from '../api/services/DisCache';

async function getUser() {
  try {
    let user = await cache.get('user');

    return user || {};

  } catch (err) {
    console.log('err on getUser:', err);
  }
}

async function getRoom() {
  try {
    let room = await cache.get('room');

    return room || {};

  } catch (err) {
    console.log('err on getRoom:', err);
  }
}

module.exports = function (io) {
  try {
    io.adapter(redis({host: 'localhost', port: 6379}));
    // let room = {};
    // let user = {};
    io.on('connection', async (socket) => {


      console.log('Co nguoi ket noi voi ' + socket.id);
      socket.on('ketnoi', async (data) => {
        try {
          let user = await getUser();
          console.log(data);
          user[data.id] = socket.id;


          await cache.set('user:', JSON.stringify(user));
        } catch (err) {
          console.log('err ketnoi:', err);
        }
      });

      socket.emit('test', {data: process.env.NODE_APP_INSTANCE});
      socket.on('room', async (data) => {
        let room = await getRoom();

        socket.join(data.room);
        room[data.room] = [data.id];
        await cache.set('room', JSON.stringify(room));

        console.log(room[data.room]);
      });
      socket.on('joinroom', async (data) => {
        try {
          let room = await getRoom();

          if (data.room in room) {
            room[data.room].push(data.id);
            await cache.set('room', JSON.stringify(room));
            io.emit('result_join_room', {success: true, room: data.room});
            console.log(room[data.room]);
          } else {
            socket.emit('result_join_room', {success: false, msg: "Khong Co Room!"});
          }
        } catch (err) {
          console.log('err on joinroom:', err);
        }
      });
      socket.on('flag', (data) => {
        console.log(data);
        socket.broadcast.emit('flaguser', data);
      });

      socket.on('play', (data) => {
        socket.broadcast.emit('playuser', data);
      });
      ////////////////////////////
      socket.on('disconnect', () => {
        console.log(socket.id + " da ngat ket noi!!");
      })
    })
  } catch (err) {
    console.log('err cmnr:', err);
  }
}
