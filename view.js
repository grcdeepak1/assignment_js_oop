"use strict"
var APP = APP || {};

APP.view = {
  ctx: function () {
     return $("#board")[0].getContext('2d');
  },

  init: function() {
    this.renderAsteroids();
    this.renderSpaceship();
    this.renderBullets();
    this.directionKeyListener();
    this.thrusterKeyListener();
    this.attackKeyListener();
  },

  drawAsteroid: function(asteroid) {
    this.ctx().fillStyle = asteroid.paintColor;
    this.ctx().beginPath();
    var x = asteroid.xCoordinate;
    var y = asteroid.yCoordinate;
    var radius = asteroid.radius;
    var startAngle = 0;
    var endAngle = Math.PI * 2;
    var anticlockwise = true;
    this.ctx().arc(x, y, radius, startAngle, endAngle, anticlockwise);
    this.ctx().fill();
  },

  drawBullet: function(bullet) {
    var ctx = this.ctx();
    var startX = bullet.xCoordinate;
    var startY = bullet.yCoordinate;
    var length = 10;
    var rotation = bullet.direction / 180 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineWidth = 3;
    ctx.lineTo(startX + Math.sin(rotation) * length, startY - Math.cos(rotation) * length);
    ctx.strokeStyle = '#FFF';
    ctx.stroke();
  },

  isOutOfBounds: function(bullet) {
    if (bullet.xCoordinate < 0 || bullet.xCoordinate > 600 || bullet.yCoordinate < 0 || bullet.xCoordinate > 400 ) {
      return true;
    } else {
      return false;
    }
  },

  renderBullets: function() {
    $.each(APP.model.bullets, function( index, bullet) {
      if (bullet === undefined) {
        return true;
      } else if (APP.view.isOutOfBounds(bullet)) {
        delete APP.model.bullets[index];
        return true;
      }
      APP.view.drawBullet(bullet);
    });
  },

  renderSpaceship: function() {
    var spaceship = APP.model.spaceship;
    var ctx = this.ctx();
    var centerX = spaceship.xCoordinate;
    var centerY = spaceship.yCoordinate;

    var shipImage = new Image();
    shipImage.src = 'asteroid_ship.ico';
    var width = shipImage.width;
    var height = shipImage.height;
    var angleInRadians = (spaceship.direction / 180) * Math.PI;

    ctx.translate(centerX, centerY);
    ctx.rotate(angleInRadians);
    ctx.drawImage(shipImage, -width / 2, -height / 2, width, height);
    ctx.rotate(-angleInRadians);
    ctx.translate(-centerX, -centerY);
  },

  renderAsteroids: function() {
    $.each(APP.model.asteroids, function( index, value ) {
      APP.view.drawAsteroid(value);
    });
  },

  resetCanvas: function () {
    this.ctx().fillStyle = "black";
    this.ctx().fillRect(0, 0, 600, 400);
  },

  directionKeyListener: function() {
    $(document).keydown( function(e) {
      if (e.keyCode == 37) {
         APP.model.spaceship.rotate("left");
      } else if (e.keyCode == 39) {
         APP.model.spaceship.rotate("right");
      }
    })
  },

  thrusterKeyListener: function() {
    $(document).keydown( function(e) {
      if (e.keyCode == 38) {
         APP.model.spaceship.accelerate(true);
      } else if (e.keyCode == 40) {
         APP.model.spaceship.accelerate(false);
      }
    })
  },

  attackKeyListener: function() {
    $(document).keydown( function(e) {
      if (e.keyCode == 32) {
         APP.model.generateBullet();
      }
    })
  }
}
