
weather = "winter";
GrassArr = [];
EatgrassArr = [];
predatorArr = [];
eaterArr = [];
krakinArr = [];
damnArr = [];
GrassStatics = 0;
Eatgrassstatics = 0;
predatorStatics = 0;
eaterStatics = 0;
krakinstatics = 0;
damnstatics = 0




EatArr = [];
eatAr = [];




var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');







app.use(express.static("."));
app.get('/', function (req, res) {
  res.redirect('index.html');
});
server.listen(3000,function(){
  console.log('swsqws')
});



var cl = false;




io.on("connection", function (socket) {
  if (cl) {
    setInterval(drawserverayin, 200);
    cl = true;
  }
});

matrix = fillMatrix(40, 40)
function fillMatrix(n, m) {
  var matrix = []
  for (var i = 0; i < n; i++) {
    matrix.push([])
    for (var a = 0; a < m; a++) {

      matrix[i].push(0)
    }
  }
  return matrix
}



var Grass = require("./modules/Grass.js");
var Eatgrass = require("./modules/Eatgrass.js");
var predator = require("./modules/predator.js");
var eater = require("./modules/eater.js");
var krakin = require("./modules/heroe.js");

for (var a = 0; a < 700; a++) {
  var x = Math.floor(Math.random() * 40)
  var y = Math.floor(Math.random() * 40)
  matrix[y][x] = 1
}

for (var c = 0; c < 120; c++) {
  var x = Math.floor(Math.random() * 40)
  var y = Math.floor(Math.random() * 40)
  matrix[y][x] = 3
}
for (var d = 0; d < 110; d++) {
  var x = Math.floor(Math.random() * 40)
  var y = Math.floor(Math.random() * 40)
  matrix[y][x] = 4
}
for (var e = 0; e < 90; e++) {
  var x = Math.floor(Math.random() * 40)
  var y = Math.floor(Math.random() * 40)
  matrix[y][x] = 5
}
for (var b = 0; b < 100; b++) {
  var x = Math.floor(Math.random() * 40)
  var y = Math.floor(Math.random() * 40)
  matrix[y][x] = 2
}



for (var y = 0; y < matrix.length; y++) {
  for (var x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] == 1) {
      var grass = new Grass(x, y, 1)
      GrassArr.push(grass)
      GrassStatics++;
    }
    else if (matrix[y][x] == 2) {
      var kt = new Eatgrass(x, y);
      EatgrassArr.push(kt)
      Eatgrassstatics++
    }
    else if (matrix[y][x] == 3) {
      var xr = new predator(x, y);
      predatorArr.push(xr)
      predatorStatics++
    }
    else if (matrix[y][x] == 4) {
      var am = new eater(x, y);
      eaterArr.push(am)
      eaterStatics++
    }
    else if (matrix[y][x] == 5) {
      var ar = new krakin(x, y);
      krakinArr.push(ar)
      krakinstatics++
    }
  }
}
function drawserverayin() {
  for (var i in GrassArr) {
    if (weather != "winter") {
        GrassArr[i].mul();
    }
  }
  for (var i in EatgrassArr) {
    EatgrassArr[i].eat();
    EatgrassArr[i].move();
    if (weather != "spring") {
        EatgrassArr[i].mul();
    }
    EatgrassArr[i].die();
  }
  for (var i in predatorArr) {
    predatorArr[i].eat();
    predatorArr[i].move();
    if (weather != "autumn") {
        predatorArr[i].mult();
    }
    predatorArr[i].die();
  }
  for (var i in eaterArr) {
    eaterArr[i].eat();
    eaterArr[i].move();
    if (weather != "autumn" || weather != "winter") {
        eaterArr[i].mult();
    }
    eaterArr[i].die();
  }
  for (var i in  krakinArr) {
    krakinArr[i].eat();
    krakinArr[i].move();
    krakinArr[i].mul();
    krakinArr[i].die();
  }

  let sendData = {
    matrix: matrix,
    GrassStatics:GrassStatics,
    Eatgrassstatics:Eatgrassstatics,
    predatorStatics:predatorStatics,
    eaterStatics:eaterStatics,
    krakinstatics:krakinstatics
  }


  io.sockets.emit("matrix", sendData)

}
setInterval(drawserverayin, 1000)
// io.on("connection", function (socket) {
// });

function changeweather() {
  if (weather == "winter") {
    weather = "spring"
  }
  else if (weather == "spring") {
    weather = "summer"
  }
  else if (weather == "summer") {
    weather = "autumn"
  }
  else if (weather == "autumn") {
    weather = "winter"
  }
  io.sockets.emit("weather", weather)
}
setInterval(changeweather, 3000)

setInterval(function(){  }, 3000 )
