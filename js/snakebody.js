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

    tick: function (_time, _timeDelta) {
      // Do something on every scene tick or frame.
    }
});


AFRAME.registerComponent("mvmt", {
  schema: {
    orbit: {type: 'selector', default: 'gameworld'},
    movement: {type: 'number', default: 0.02},
    rotateSpeed: {type: 'number', default: 0.3}
  },

  init: function() {
    let el = this.el;
    let data = this.data;

    this.tick = AFRAME.utils.throttleTick(this.tick, 5, this);

     //tracked controller
     window.addEventListener("gamepadconnected", (event) => {
      // console.log("A gamepad connected:");
       //console.log(event.gamepad)[0];
       });  
     

    document.addEventListener('keyup', event => {
      if (event.code === 'Space') {
        console.log('Space Bar pressed'); 
        // 180 degree movement and material
        //el.object3D.rotation.z -= Math.PI;
    
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
        el.object3D.rotation.z += data.rotateSpeed;
        el.object3D.rotation.z = ((el.object3D.rotation.z % max) + max) % max; 


        //let test = Object.values(navigator.getGamepads()[0].axes)[1]
        //console.log(typeof test);
        //console.log( navigator.getGamepads()[0].axes);
        //console.log( Object.values(navigator.getGamepads()[0].axes)[1]);

      }
      if (event.code === 'ArrowRight') {
        //rotate snake clockwise
        el.object3D.rotation.z -= data.rotateSpeed;
        el.object3D.rotation.z = ((el.object3D.rotation.z % max) + max) % max;
      }

    })
  },

  tick: function  (_t, _dt) {

    let el = this.el;
    let data = this.data;
    
    let angle = (el.object3D.rotation.z)
    const moveZ = 0.2;

    //Modulo for rotation angles
    const maxRotation = 2*Math.PI;
    const slowdown = 0.5;

 
    //gamepad controller code   
    if (navigator.getGamepads().hasOwnProperty("0") )
    {
       let test = Object.values(navigator.getGamepads()[0].axes)[1]
       console.log(test);

      //if Left is pressed
      if (test == 1) {

        //console.log("Left")
        //rotate snake counter-clockwise
        el.object3D.rotation.z += data.rotateSpeed * slowdown;
        el.object3D.rotation.z = ((el.object3D.rotation.z % maxRotation) + maxRotation) % maxRotation; 

      } 

      //if Right is pressed
      if (test == -1) {
        //console.log("Right")
        //rotate snake clockwise
        el.object3D.rotation.z -= data.rotateSpeed * slowdown;
        el.object3D.rotation.z = ((el.object3D.rotation.z % maxRotation) + maxRotation) % maxRotation; 
      }
      
      
      //console.log(navigator.getGamepads()[0].axes[1]);
    }

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

        //console.log(data.orbit.object3D.position.y)
      //if inside inner cylinder
      if (data.orbit.object3D.position.z >= 0 )
      {
        //the below line DOES work correctly!!!
        el.object3D.position.z-= moveZ;  
         
        el.object3D.rotation.z = -el.object3D.rotation.z
        el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
      } 
      else
      {
        //the below line doesn't work correctly.
        //use the crawling-cursor script for ideas
        //data.orbit.object3D.position.z+= moveZ;
        //el.object3D.position.z+= moveZ;
        el.object3D.rotation.z = -el.object3D.rotation.z
        el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
      }
    }

   //wrapping around bottom edge code
   if (data.orbit.object3D.position.y <= min ) {

      //console.log(data.orbit.object3D.position.y)
    //if  NOT inside cylinder
    if (data.orbit.object3D.position.z >= 0 )
    {
      //the below line doesn't work correctly.
      //use the crawling-cursor script for ideas
      //el.object3D.position.z-= moveZ;  
      el.object3D.rotation.z = -el.object3D.rotation.z
      el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
    } 
    else
    {
      //the below line doesn't work correctly.
      //use the crawling-cursor script for ideas
     // el.object3D.position.z+= moveZ;
      el.object3D.rotation.z = -el.object3D.rotation.z
      el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
    }
  }}

});