"use strict"
var APP = APP || {};

APP.controller = {
  init: function() {
    APP.model.init();
    APP.view.init();
    var gameTick = setInterval(function () {
      APP.controller.moveAsteroids();
      APP.controller.moveSpaceship();
      APP.view.resetCanvas();
      APP.view.renderAsteroids();
      APP.view.renderSpaceship();
    }, 100);
  },

  moveAsteroids: function() {
    $.each(APP.model.asteroids, function( index, asteroid) {
      asteroid.tic();
    });
  },

  moveSpaceship: function() {
    APP.model.spaceship.tic();
  }

}

$(document).ready( function() {
  APP.controller.init();
});