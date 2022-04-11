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
    orbit: {type: 'selector', default: 'gameworld'}
  },

  init: function() {
    let el = this.el;
    let data = this.data;

    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        console.log('Space pressed'); //whatever you want to do when space is pressed
      } 
    })

  },

  update: function () {
   
    let el = this.el;
    let data = this.data;

    const moveZ = 0.1;

    //remember to clamp the movement variable to 2*PI
    const movement = 0.05;

    //Arrow Key Movement
    document.addEventListener('keydown', event => {
     
      if (event.code === 'ArrowLeft') {
        //data.orbit.object3D.rotation.y += movement; 

        //rotate sphere counter-clockwise
        el.object3D.rotation.z += movement
        console.log(el.object3D.rotation.z)

      }
      if (event.code === 'ArrowRight') {
        //data.orbit.object3D.rotation.y -= movement;

        //rotate sphere clockwise
        el.object3D.rotation.z -= movement
      }
      
      if (event.code ===  'ArrowUp') {
        data.orbit.object3D.position.y += movement; 
        // if snake reaches top of gameworld

        if (data.orbit.object3D.position.y >= 0.490 ) {

          if (data.orbit.object3D.position.z >= 0 )
          {
            data.orbit.object3D.position.z-= moveZ;
          }
          else
          {
            data.orbit.object3D.position.z+= moveZ;
          }
        }

      }
      if (event.code === 'ArrowDown') {
        data.orbit.object3D.position.y -= movement; 

        // if snake reaches bottom of gameworld
        if (data.orbit.object3D.position.y <= -0.490 ) {

          if (data.orbit.object3D.position.z >= 0 )
          {
            data.orbit.object3D.position.z-= moveZ;
          }
          else
          {
            data.orbit.object3D.position.z+= moveZ;
          }
        }
      }
      
    })

  }

});


function innerOuterBorder() {
  
};
