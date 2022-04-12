AFRAME.registerComponent('snakebody', {
    init: function () {
        let el = this.el;
      
          this.addSnake = function (e) {
              let coordinate = e.detail.intersection.point;
              let scene = document.querySelector('a-scene');

              let point = document.createElement('a-entity');
              point.setAttribute('geometry', {
                  primitive: 'sphere'
              });

              point.setAttribute('material', 'color: firebrick');
              point.setAttribute('radius', '1');
              point.setAttribute('position', '1 0 -1');
              scene.appendChild(point);
              }
        this.el.addEventListener('onload', this.addSnake);

    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});


AFRAME.registerComponent("mvmt", {
  schema: {
    orbit: {type: 'selector', default: 'gameworld'},
    movement: {type: 'number', default: 0.05}
  },

  init: function() {
    let el = this.el;
    let data = this.data;

    this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);

    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        console.log('Space pressed'); //whatever you want to do when space is pressed

        // 180 degree movement and material
        //el.object3D.rotation.z -= Math.PI;
        console.log(el.object3D.rotation.z)
      } 
    })
  },

  update: function () {
    let el = this.el;
    let data = this.data;

    const moveZ = 0.1;

    const sceneEl = document.querySelector('a-scene');
    const worldHeight = sceneEl.querySelector('#gameworld').getAttribute('height') ;

    //Arrow Key Movement
    document.addEventListener('keydown', event => {
     
    //Modulo for rotation angles
    const max = 2*Math.PI;

      if (event.code === 'ArrowLeft') {
        //rotate snake counter-clockwise
        el.object3D.rotation.z += data.movement;
        el.object3D.rotation.z = ((el.object3D.rotation.z % max) + max) % max; 

        //console.log("clamped info: " + el.object3D.rotation.z)
      }
      if (event.code === 'ArrowRight') {
        //rotate snake clockwise
        el.object3D.rotation.z -= data.movement
        el.object3D.rotation.z = ((el.object3D.rotation.z % max) + max) % max;
      }

      //wrapping around bottom edge code
      if (data.orbit.object3D.position.y <= -worldHeight ) {

        if (data.orbit.object3D.position.z >= 0 )
        {
          data.orbit.object3D.position.z-= moveZ;
        }
        else
        {
          data.orbit.object3D.position.z+= moveZ;
        }
      }

    })

  },

  tick: function  (t, dt) {

    let el = this.el;
    let data = this.data;
    
    let angle = (el.object3D.rotation.z)
    const moveZ = 0.1;
 
    //clamp number
    const min = -0.5;
    const max = 0.5;

    const radiansmax = 2*Math.PI;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    //horizontal movement
    data.orbit.object3D.rotation.y -= data.movement * Math.cos(angle);

    //vertical movement clamped at top and bottom
    data.orbit.object3D.position.y += data.movement * Math.sin(angle); 
    data.orbit.object3D.position.y = clamp(data.orbit.object3D.position.y, min, max);

    //wrapping around top edge code
      if (data.orbit.object3D.position.y >= max ) {

        console.log(data.orbit.object3D.position.y)
      //if inside inner cylinder
      if (data.orbit.object3D.position.z >= 0 )
      {
        //the below line doesn't work correctly.
        //use the crawling-cursor script for ideas
        //data.orbit.object3D.position.z-= moveZ;

        if (el.object3D.rotation.z <= Math.PI/2) {

          //this doesn't quite work...
          console.log("this is here")
          let anglecheck2 = el.object3D.rotation.z - (Math.PI/2);
          let anglecheck =  anglecheck2 + (el.object3D.rotation.z);
          el.object3D.rotation.z = ((anglecheck % radiansmax ) + radiansmax) % radiansmax;

        }
        else{
          el.object3D.rotation.z += Math.PI/2;
          el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
        }
      }
      else
      {
        //the below line doesn't work correctly.
        //use the crawling-cursor script for ideas
        data.orbit.object3D.position.z+= moveZ;
        
        if (el.object3D.rotation.z <= Math.PI/2) {
          //el.object3D.rotation.z -= Math.PI/2;
          el.object3D.rotation.z = el.object3D.rotation.z - Math.PI ;
        }
        else{
          el.object3D.rotation.z += Math.PI/2;
        }

      }
    }

  }

});