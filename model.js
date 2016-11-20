"use strict"
var APP = APP || {};

APP.model = {
  asteroids: [],
  numAsteroids: 10,
  bullets: [],
  spaceship: undefined,
  init: function() {
    APP.model.generateAstroids();
    APP.model.generateSpaceship();
  },

  generateAstroids: function() {
    for(var i = 0 ; i < this.numAsteroids; i++) {
      var xCoordinate = APP.helper.myRandom(600);
      var yCoordinate = APP.helper.myRandom(400);
      var xVelocity = APP.helper.myRandom(6) - 3;
      var yVelocity = APP.helper.myRandom(6) - 3;
      var radius = APP.helper.myRandom(50, 10);
      APP.model.asteroids.push(new APP.model.Asteroid(xCoordinate, yCoordinate, xVelocity, yVelocity, radius));
    }
  },

  generateSpaceship: function() {
    APP.model.spaceship = new APP.model.Spaceship(100, 200, 0, 0);
  },

  generateBullet: function() {
    var ship = APP.model.spaceship;
    var x = ship.xCoordinate;
    var y = ship.yCoordinate;
    var xVel = Math.sin(ship.direction / 180 * Math.PI) * 5;
    var yVel = Math.cos(ship.direction / 180 * Math.PI) * -5;
    var direction = ship.direction;
    APP.model.bullets.push(new APP.model.Bullet(x, y, xVel, yVel, direction));
  }
}

APP.model.Bullet = function(xCoordinate, yCoordinate, xVelocity, yVelocity, direction) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.direction = direction;
}

//Spaceship
APP.model.Spaceship = function(xCoordinate, yCoordinate, xVelocity, yVelocity) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.direction = 360;
};
APP.model.Spaceship.prototype.rotate = function(direction) {
  if (direction === 'left') {
    this.direction -= 5;
    if (this.direction < 1) {
      this.direction = 360;
    }
  } else if (direction === 'right') {
    this.direction += 5;
    if (this.direction > 360) {
      this.direction = 1;
    }
  }
};

APP.model.Spaceship.prototype.accelerate = function(positive) {
  var radians = (this.direction / 180) * Math.PI;
  if (positive) {
    this.xVelocity += Math.sin(radians) * 5;
    this.yVelocity -= Math.cos(radians) * 5;
  } else {
    this.xVelocity -= Math.sin(radians) * 5;
    this.yVelocity += Math.cos(radians) * 5;
  }
};

//Asteroids
APP.model.Asteroid = function(xCoordinate, yCoordinate, xVelocity, yVelocity, radius) {
  var color = ["red", "orange", "white", "yellow"]
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
  if (this.xCoordinate < 0 ) this.xCoordinate = 600;
  if (this.xCoordinate > 600) this.xCoordinate = 0;
  if (this.yCoordinate < 0 ) this.yCoordinate = 400;
  if (this.yCoordinate > 400) this.yCoordinate = 0;

};

APP.model.Spaceship.prototype.tic = APP.model.Asteroid.prototype.tic;
APP.model.Bullet.prototype.tic = function () {
  this.xCoordinate += this.xVelocity;
  this.yCoordinate += this.yVelocity;
}

APP.helper =  {
  myRandom: function(maxNum, minNum) {
    var random;
    do {
      random = Math.floor(Math.random() * maxNum);
    } while(random < minNum)
    return random;
  }
}