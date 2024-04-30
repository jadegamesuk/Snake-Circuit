AFRAME.registerComponent("mvmtvr", {
  schema: {
    orbit: {type: 'selector', default: '#gameworld'},
    movement: {type: 'number', default: 0.01},
    rotateSpeed: {type: 'number', default: 0.3},
    innerWall: {type: 'boolean', default: true}
  },

  init: function() {
    this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);

    let el = this.el;
    let data = this.data;
   // let sceneEl = document.querySelector('a-scene');

    //VR controller test
    // To be replaced with Axis move
    el.addEventListener("buttondown", function () {
     
      alert("BUTTON PRESSED ON CONTROLLER");
      const max = 2*Math.PI;
      el.object3D.rotation.z += data.rotateSpeed;
      el.object3D.rotation.z = ((el.object3D.rotation.z % max) + max) % max; 
    })

    //alert("Gamepad: " + navigator.getGamepads().values)
    alert(Object.values(navigator.getGamepads()))

    /*
     //Keyboard Movement
     document.addEventListener('keydown', event => {
     
      //Modulo for rotation angles
      const max = 2*Math.PI;
  
        if (event.code === 'ArrowLeft') {
          //rotate snake counter-clockwise
          el.object3D.rotation.z += data.rotateSpeed;
          el.object3D.rotation.z = ((el.object3D.rotation.z % max) + max) % max; 
        }
        if (event.code === 'ArrowRight') {
          //rotate snake clockwise
          el.object3D.rotation.z -= data.rotateSpeed;
          el.object3D.rotation.z = ((el.object3D.rotation.z % max) + max) % max;
        }
      })
      */
  },

  tick: function  (_t, _dt) {

    let el = this.el;
    let data = this.data;
    
    let angle = (el.object3D.rotation.z)

    //Modulo for rotation angles
    const maxRotation = 2*Math.PI;

    //OLD gamepad controller code  
    /* 
    if (navigator.getGamepads().hasOwnProperty("0") )
    {
       let test = Object.values(navigator.getGamepads()[0].axes)[1]
       //console.log(test);

      //if Left is pressed
      if (test == 1) {
        //rotate snake counter-clockwise
        el.object3D.rotation.z += data.rotateSpeed * slowdown;
        el.object3D.rotation.z = ((el.object3D.rotation.z % maxRotation) + maxRotation) % maxRotation; 
      } 

      //if Right is pressed
      if (test == -1) {
        //rotate snake clockwise
        el.object3D.rotation.z -= data.rotateSpeed * slowdown;
        el.object3D.rotation.z = ((el.object3D.rotation.z % maxRotation) + maxRotation) % maxRotation; 
      }
    }
    */

    //clamp number
    const cylinderMin = -0.5*1.1;
    const cylinderMax = 0.5*1.1;
    const radiansmax = 2*Math.PI;
    const moveZ = 0.1;

    //const radiansmax = 2*Math.PI;
    const clamp = (num, cylinderMin, cylinderMax) => Math.min(Math.max(num, cylinderMin), cylinderMax);

    //horizontal movement
    data.orbit.object3D.rotation.y -= data.movement * Math.cos(angle);
    data.orbit.object3D.rotation.y = ((data.orbit.object3D.rotation.y % maxRotation) + maxRotation) % maxRotation; 

    //vertical movement clamped at top and bottom
    data.orbit.object3D.position.y += data.movement * Math.sin(angle); 
    data.orbit.object3D.position.y = clamp(data.orbit.object3D.position.y, cylinderMin, cylinderMax);

      //wrapping around top edge code
      if (data.orbit.object3D.position.y >= cylinderMax ) {

      //if inside inner cylinder
        if (data.innerWall == true)
        {
          data.innerWall = false;
          el.object3D.position.z-= moveZ; 
          el.object3D.rotation.z = -el.object3D.rotation.z;
          el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
        } 
        else
        {
          data.innerWall = true;
          el.object3D.position.z += moveZ;  
          el.object3D.rotation.z = -el.object3D.rotation.z;
          el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
        }
    }

    //wrapping around bottom edge code
      if (data.orbit.object3D.position.y <= cylinderMin ) {

        if (data.innerWall == true )
        {
          data.innerWall = false
          el.object3D.position.z-= moveZ 
          el.object3D.rotation.z = -el.object3D.rotation.z
          el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
        } 
        else
        {
          data.innerWall = true
          el.object3D.position.z += moveZ;  
          el.object3D.rotation.z = -el.object3D.rotation.z
          el.object3D.rotation.z = ((el.object3D.rotation.z % radiansmax ) + radiansmax) % radiansmax;
        }
      }
    }

});