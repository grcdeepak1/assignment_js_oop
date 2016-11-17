"use strict"
var APP = APP || {};

APP.model = {
  asteroids: [],
  numAsteroids: 50,

  init: function() {
    APP.model.generateAstroids();
  },

  generateAstroids: function() {
    for(var i = 0 ; i < this.numAsteroids; i++) {
      var xCoordinate = APP.model.myRandom(1000) - 200;
      var yCoordinate = APP.model.myRandom(800) - 200;
      var xVelocity = APP.model.myRandom(6) - 3;
      var yVelocity = APP.model.myRandom(6) - 3;
      var radius = APP.model.myRandom(50, 10);
      APP.model.asteroids.push(new APP.model.Asteroid(xCoordinate, yCoordinate, xVelocity, yVelocity, radius));
    }
  },


}


APP.model.Asteroid = function(xCoordinate, yCoordinate, xVelocity, yVelocity, radius) {
  var color = ["red", "green", "orange", "white", "yellow"]
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.radius    = radius;
  this.paintColor = color[Math.floor(Math.random() * color.length)];
};

APP.model.Asteroid.prototype.tic = function () {
  this.xCoordinate += this.xVelocity;
  this.yCoordinate += this.yVelocity;

  //Direction change if asteroids hit galaxy wall!
  if (this.xCoordinate < -200 || this.xCoordinate > 800)
    this.xVelocity = -this.xVelocity;
  if (this.yCoordinate < -200 || this.yCoordinate > 600)
    this.yVelocity = -this.yVelocity;
};

APP.model.myRandom = function(maxNum, minNum) {
  var random;
  do {
    random = Math.floor(Math.random() * maxNum);
  } while(random < minNum)
  return random;
}