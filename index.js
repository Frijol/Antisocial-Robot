require('tesselate') ({
  modules: {
    A: ['ambient-attx4', 'ambientL'],
    C: ['ambient-attx4', 'ambientR']
  },
}, function(tessel, modules) {
  var left = modules.ambientL;
  var right = modules.ambientR;
  var car = require('servo-car').use(tessel.port['B'], function () {
    setInterval( function () {
      right.getSoundLevel(function (err, rightNoise) {
        left.getSoundLevel (function (err, leftNoise) {
          console.log('Right:', rightNoise, '\tLeft:', leftNoise);
          if (rightNoise > leftNoise) {
            console.log('Go left');
            car.left();
          } else if (rightNoise < leftNoise) {
            console.log('Go right');
            car.right();
          } else {
            console.log('Plunge ahead');
            car.forward();
          }
        });
      });
    }, 500);
  });
});
