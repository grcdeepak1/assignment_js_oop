"use strict"
var APP = APP || {};

APP.view = {
  ctx: function () {
     return $("#board")[0].getContext('2d');
  },

  init: function() {
    this.renderAsteroids();
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

  renderAsteroids: function() {
    $.each(APP.model.asteroids, function( index, value ) {
      APP.view.drawAsteroid(value);
    });
  },

  resetCanvas: function () {
    this.ctx().fillStyle = "black";
    this.ctx().fillRect(0, 0, 600, 400);
  }
}
