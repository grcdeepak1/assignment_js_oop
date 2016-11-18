"use strict"
var APP = APP || {};

APP.view = {
  ctx: function () {
     return $("#board")[0].getContext('2d');
  },

  init: function() {
    this.renderAsteroids();
    this.renderSpaceship();
    this.directionKeyListener();
    this.thrusterKeyListener();
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
  }
}
