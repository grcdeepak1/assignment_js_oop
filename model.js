"use strict"
var APP = APP || {};

APP.model = {
  asteroids: [],
  numAsteroids: 5,
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
      var radius = APP.helper.myRandom(50, 20);
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
  },

  clearBullets: function () {
     for (var i = 0; i < APP.model.bullets.length; i++) {
      var x = this.bullets[i].xCoordinate;
      var y = this.bullets[i].yCoordinate;
      if (x > 600 || x < 0 || y > 400 || y < 0) {
        this.bullets.splice(i, 1);
      };
    };
  },

  bulletCollidesWithAsteroid: function() {
    $.each(APP.model.bullets, function(i, bullet) {
      $.each(APP.model.asteroids, function(j, asteroid) {
        if (asteroid !== undefined && bullet !== undefined && bullet.hit(asteroid)) {
          this.explode(j);
          APP.model.bullets.splice(i, 1);
        }
      })
    })
  },

  shipCollidesWithAsteroid: function() {
    if (APP.model.asteroids.length === 0)
      return true;
    for(var i=0; i < APP.model.asteroids.length ; i++) {
      if (APP.model.spaceship.hit(APP.model.asteroids[i]) === true) {
        return true;
      }
    }
  }
}


//Bullet Constructor
APP.model.Bullet = function(xCoordinate, yCoordinate, xVelocity, yVelocity, direction) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.direction = direction;
}

//Spaceship Constructor
APP.model.Spaceship = function(xCoordinate, yCoordinate, xVelocity, yVelocity) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.direction = 360;
};

//Asteroid Contructor
APP.model.Asteroid = function(xCoordinate, yCoordinate, xVelocity, yVelocity, radius) {
  var color = ["red", "orange", "white", "yellow"]
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.radius    = radius;
  this.paintColor = color[Math.floor(Math.random() * color.length)];
};

//Spaceship actions
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

//Collision methods
APP.model.Bullet.prototype.hit = function(asteroid) {
  var bullet_x = this.xCoordinate;
  var bullet_y = this.yCoordinate;
  var asteroid_x = asteroid.xCoordinate;
  var asteroid_y = asteroid.yCoordinate;
  var distance = Math.sqrt((bullet_x - asteroid_x) * (bullet_x - asteroid_x) + (bullet_y - asteroid_y) * (bullet_y - asteroid_y));
  if (distance <= asteroid.radius) {
    return true;
  } else {
    return false;
  }
};

APP.model.Spaceship.prototype.hit = function(asteroid) {
  var ship_x = this.xCoordinate;
  var ship_y = this.yCoordinate;
  var asteroid_x = asteroid.xCoordinate;
  var asteroid_y = asteroid.yCoordinate;
  var distance = Math.sqrt((ship_x - asteroid_x) * (ship_x - asteroid_x) + (ship_y - asteroid_y) * (ship_y - asteroid_y));
  if (distance <= asteroid.radius) {
    return true;
  }
}

APP.model.Asteroid.prototype.explode = function(index) {
  APP.model.asteroids.splice(index, 1);
  var x = this.xCoordinate;
  var y = this.yCoordinate;
  var radius = this.radius/2;
  if (radius < 10) {
    return true;
  }
  for(var i=0; i < 2; i++) {
    var xVelocity = APP.helper.myRandom(6) - 3;
    var yVelocity = APP.helper.myRandom(6) - 3;
    APP.model.asteroids.push(new APP.model.Asteroid(x, y, xVelocity, yVelocity, radius));
  }
}


//Tics
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