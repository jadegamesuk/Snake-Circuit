AFRAME.registerComponent('food', {
    schema: {
        orbit: {type: 'selector', default: '#gameworld2'},
        appleCount: {type: 'number', default: 0},
        food: {type: 'selector', default: 'apple'}
    },

    init: function () {
        this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);

    },

    update: function () {
      },

    tick: function (_t, _dt) {

      let el = this.el;
      let data = this.data;
      let scene = document.querySelector('a-scene');

        el.addEventListener("hitstart", function(event) {
          //if collision with apple occurs          
        if (event.target.id)
        {
            //delete gltf apple
            //console.log("removing: " + el.id);
            el.parentNode.removeChild(el);
            event.target.id = ""

            //add score
            data.appleCount++;
            console.log("SCORE: " + data.appleCount);
            scoreCounter = "Apple" + data.appleCount;

             //create new apple
             let entityEl = document.createElement('a-gltf-model');
             
             //let entityEl = scene.querySelector('#apple')
             entityEl.setAttribute('src', '#apple');
             entityEl.setAttribute('scale', {x: 0.4, y: 0.4, z: 0.4});

             //Create random value for X-axis
             let xAxis = 0.1;

             // Create random value for Y-axis
             let yAxis = Math.random() * (2.1 - 1.1) + 1.1;

             //Create random value for Z-axis (0.65 or -0.75)
             let zAxis = Math.random() < 0.5 ? -0.60 : -0.75;

             entityEl.setAttribute('position', {x: xAxis, y: yAxis, z: zAxis});
             entityEl.setAttribute('id', '#apple-item' );

             entityEl.setAttribute('food', {orbit: 'player-wrapper2', appleCount: data.appleCount });
             scene.appendChild(entityEl);

        }
        });

    }
});

