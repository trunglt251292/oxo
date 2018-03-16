function joinroom() {
  let room = document.getElementById('textroom').value;
  let data = {
    room:room,
    id:id
  }
  socket.emit('joinroom',data);
}

function createroom() {
  document.getElementById('nameroom').innerHTML = a;
  document.getElementById('createroom').disabled = true;
  document.getElementById('joinroom').disabled = true;
  socket.emit('room',{room:a,id:id});
}

function leaveroom() {
  document.getElementById('nameroom').innerHTML = 'Not Room';
  document.getElementById('createroom').disabled = false;
  document.getElementById('joinroom').disabled = false;
}

function flagX() {
  let room = document.getElementById('nameroom').innerHTML;
  console.log(room);
  if(room){
    document.getElementById('flag').innerHTML = "X";
    document.getElementById('X').disabled = true;
    document.getElementById('O').disabled = false;
    socket.emit('flag',{flag:0});
    flag = "X";
  }else {
    alert('Chua Co Doi Thu Nhe !!!!');
  }
}
function flagO(){
  let room = document.getElementById('nameroom').innerHTML;
  console.log(room);
  if(room){
    document.getElementById('flag').innerHTML = "O";
    document.getElementById('X').disabled = false;
    document.getElementById('O').disabled = true;
    socket.emit('flag',{flag:1});
    flag = "O";
  }else {
    alert('Chua Co Doi Thu Nhe !!!!');
  }
}
