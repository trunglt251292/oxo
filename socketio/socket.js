import socketEvents from './socketEvents/notification';

module.exports = function (io) {
  let room = {};
  let user = {};
  io.on('connection', (socket)=>{
    console.log('Co nguoi ket noi voi '+socket.id);
    socket.on('ketnoi',(data)=>{
      console.log(data);
      user[data.id] = socket;
    });

    socket.emit('test',{data:'Hello'});
    socket.on('room',(data)=>{
      socket.join(data.room);
      room[data.room]=[data.id];
      console.log(room[data.room]);
    });
    socket.on('joinroom',(data)=>{
      if(data.room in room){
        room[data.room].push(data.id);
        io.emit('result_join_room',{success:true,room:data.room});
        console.log(room[data.room]);
      }else{
        socket.broadcast.emit('result_join_room',{success:false,msg:"Khong Co Room!"});
      }
    });
    socket.on('flag',(data)=>{
      console.log(data);
      socket.broadcast.emit('flaguser',data);
    });

    socket.on('play',(data)=>{
      socket.broadcast.emit('playuser',data);
    });
    ////////////////////////////
    socket.on('disconnect',()=>{
      console.log(socket.id+" da ngat ket noi!!");
    })
  })
}
