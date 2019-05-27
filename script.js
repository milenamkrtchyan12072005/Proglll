var weather = "winter"
var weatherh1 = document.getElementById("weather")
var socket = io();
var side = 20;
var m = 40;
var n = 40;
function setup() {
  frameRate(10);
  createCanvas(m * side, n * side);
  background('#acacac');
  
}
function drawmatrix(data) {
  let grassCount = document.getElementById('garssCount');
  grassCount.innerText = data.GrassStatics;
  let garssEaterCount = document.getElementById('garssEaterCount');
  garssEaterCount.innerText = data.Eatgrassstatics;
  let predatorCount = document.getElementById('predatorCount');
  predatorCount.innerText = data.predatorStatics;
  let eaterCount = document.getElementById('eaterCount');
  eaterCount.innerText = data.eaterStatics;
  let krakinCount = document.getElementById('krakinCount');
  krakinCount.innerText = data.krakinstatics;
  matrix = data.matrix;



  console.log(data.matrix);
  console.log(data.GrassStatics);
  console.log(data.Eatgrassstatics);
  console.log(data.predatorStatics);
  console.log(data.eaterStatics);
  console.log(data.krakinstatics);
  
  
  
  
  
  
  
  
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      //console.log(1)
      if (matrix[y][x] == 1) {
        if (weather == "winter") {
          fill("#81FF8E")
          rect(y * side, x * side, side, side);
        }
        if (weather == "spring") {
          fill("green");
          rect(y * side, x * side, side, side);
        }
        if (weather == "summer") {
          fill("#00FF00")
          rect(y * side, x * side, side, side);
        }
        if (weather == "autumn") {
          fill("#ff9900")
          rect(y * side, x * side, side, side);
        }
      }
      else if (matrix[y][x] == 0) {
        fill("#acacac");
        rect(y * side, x * side, side, side);
      }
      else if (matrix[y][x] == 2) {{
        fill("yellow");
        rect(y * side, x * side, side, side);
      }
      {
        if (weather == "winter") {
          rect(y * side, x * side, side, side);
          fill("#FDA50F")
        }
        if (weather == "spring") {
          fill("#FFD300");
          rect(y * side, x * side, side, side);
        }
        if (weather == "summer") {
          fill("#FCE205")
          rect(y * side, x * side, side, side);
        }
        if (weather == "autumn") {
          fill("#E4CD05")
          rect(y * side, x * side, side, side);
        }
      }
    }
      else if (matrix[y][x] == 3) {{
        fill("red");
        rect(y * side, x * side, side, side);
      }
      {
        if (weather == "winter") {
          rect(y * side, x * side, side, side);
          fill("#C21807")
        }
        if (weather == "spring") {
          fill("#FF2400");
          rect(y * side, x * side, side, side);
        }
        if (weather == "summer") {
          fill("#800000")
          rect(y * side, x * side, side, side);
        }
        if (weather == "autumn") {
          fill("#B80F0A")
          rect(y * side, x * side, side, side);
        }
      }
    }
      
      else if (matrix[y][x] == 4) {{
        fill("blue")
        rect(y * side, x * side, side, side);
      }
      {
        if (weather == "winter") {
          rect(y * side, x * side, side, side);
          fill("#000080")
        }
        if (weather == "spring") {
          fill("#1134A6");
          rect(y * side, x * side, side, side);
        }
        if (weather == "summer") {
          fill("#003151")
          rect(y * side, x * side, side, side);
        }
        if (weather == "autumn") {
          fill("#0E4C92")
          rect(y * side, x * side, side, side);
        }
      }
    }
      else if (matrix[y][x] == 5) {
        if (weather == "winter") {
          rect(y * side, x * side, side, side);
          fill("purple;")
        }
        if (weather == "spring") {
          fill("#793802");
          rect(y * side, x * side, side, side);
        }
        if (weather == "summer") {
          fill("#813F0B")
          rect(y * side, x * side, side, side);
        }
        if (weather == "autumn") {
          fill("brown")
          rect(y * side, x * side, side, side);
        }
      }
      rect(y * side, x * side, side, side);
    }
  }
}
socket.on("matrix", drawmatrix);
socket.on("weather", function (w) {
  weather = w;
  //console.log(weather);
  weather.innerHTML = weather
});


