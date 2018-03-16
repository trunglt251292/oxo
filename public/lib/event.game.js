var canvas = [];

for(var i = 1; i<101 ; i++){
  canvas[i] =  document.getElementById("canvas"+i);
}

var ctx = [];
for (var i = 1; i < 101; i++) {
  ctx[i] = canvas[i].getContext('2d');
}

var co = [];
for (var i = 1; i < 101; i++) {
  co[i] = false;
}

function x(i) {
  console.log(flag);
  if(!co[i]){
    co[i]=true;
    canvas[i].style.webkitTransform = "rotate(180deg)";
    ctx[i].font = "50px serif";
    ctx[i].fillText(flag,9,40);
    socket.emit('play',{position:i,flag:flag});
  }
}
