var Astroid = function(x_coord, y_coord, x_velocity, y_velocity) {
  this.x = x_coord;
  this.y = y_coord;
  this.x_velocity = x_velocity;
  this.y_velocity = y_velocity;
}

Astroid.prototype.tic = function() {
  this.x += this.x_velocity;
  this.y += this.y_velocity;
}

var Astroid2 = function(x_coord, y_coord, x_velocity, y_velocity) {
  this.x = x_coord;
  this.y = y_coord;
  this.x_velocity = x_velocity;
  this.y_velocity = y_velocity;
  this.tic = function() {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  }
}

NUM_ASTROIDS = 1000;
NUM_TICS = 1000;

function TestPerformance() {
  var prototypeStartDateTime = new Date();
  var protoAstroids = [];
  for (var i = 0; i < NUM_ASTROIDS; i++)
  {
    var x = Math.floor(Math.random() * 1000);
    var y = Math.floor(Math.random() * 1000);
    var vx = Math.floor(Math.random() * 100);
    var vy = Math.floor(Math.random() * 100);
    protoAstroids[i] = new Astroid(x, y, vx, vy);
    for (var j = 0; j < NUM_TICS; j++)
      protoAstroids[i].tic();
  }
  var prototypeEndDateTime = new Date();

  var nonPrototypeStartDateTime = new Date();
  var nonProtoAstroids = [];
  for (var i = 0; i < NUM_ASTROIDS; i++)
  {
    var x = Math.floor(Math.random() * 1000);
    var y = Math.floor(Math.random() * 1000);
    var vx = Math.floor(Math.random() * 100);
    var vy = Math.floor(Math.random() * 100);
    nonProtoAstroids[i] = new Astroid(i, i+1, i+2, i+3);
    for (var j = 0; j < NUM_TICS; j++)
      nonProtoAstroids[i].tic();
  }
  var nonPrototypeEndDateTime = new Date();

  // Process the times
  var prototypeTime = prototypeEndDateTime.getTime() - prototypeStartDateTime.getTime();
  var nonPrototypeTime = nonPrototypeEndDateTime.getTime() - nonPrototypeStartDateTime.getTime();
  // Display the results
  alert("prototype time: " + prototypeTime  + "\t"+ "nonPrototypeTime: " + nonPrototypeTime);
}
$(document).ready( function() {
  TestPerformance();
});