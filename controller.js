"use strict"
var APP = APP || {};

APP.controller = {
  init: function() {
    APP.model.init();
    APP.view.init();
    var gameTick = setInterval(function () {
      APP.controller.moveAsteroids();
      APP.controller.moveSpaceship();
      APP.controller.moveBullets();
      APP.view.resetCanvas();
      APP.view.renderAsteroids();
      APP.view.renderSpaceship();
      APP.view.renderBullets();
    }, 100);
  },

  moveAsteroids: function() {
    $.each(APP.model.asteroids, function( index, asteroid) {
      asteroid.tic();
    });
  },

  moveSpaceship: function() {
    APP.model.spaceship.tic();
  },

  moveBullets: function() {
    $.each(APP.model.bullets, function( index, bullet) {
      if (bullet !== undefined)
        bullet.tic();
    });
  },

}

$(document).ready( function() {
  APP.controller.init();
});