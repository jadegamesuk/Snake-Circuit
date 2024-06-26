AFRAME.registerComponent("mvmtvr", {
  schema: {
    orbit: {type: 'selector', default: '#gameworld'},
    movement: {type: 'number', default: 0.01},
    rotateSpeed: {type: 'number', default: 0.20},
    innerWall: {type: 'boolean', default: true},
    angle: {type: 'number', default: 0},
    axismoveangle: {type: 'number', default: 0},
    headmovement: {type: 'selector', default: '#gameworld'}
  },

  init: function() {
    this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);

    let el = this.el;
    let data = this.data;

    let sound_bgm = document.querySelector('#sound-bgm');

    //VR controls
    el.addEventListener('axismove', function () {

      sound_bgm.components.sound.playSound();

      let axisX = document.querySelector('#VR-controls').components["tracked-controls"].axis[0]
      let axisY = document.querySelector('#VR-controls').components["tracked-controls"].axis[1]
      data.axismoveangle = -Math.atan2(axisY, axisX)

      //VR Turning Controls 
      data.angle = data.axismoveangle
      data.headmovement.object3D.rotation.z = data.axismoveangle
    })

    el.addEventListener('touchend', function () {

      //VR Turning Controls 
      data.angle = data.axismoveangle
      data.headmovement.object3D.rotation.z = data.axismoveangle
    })

    //Keyboard controls
    document.addEventListener('keydown', event => {

      sound_bgm.components.sound.pauseSound();
      sound_bgm.components.sound.playSound();

        if (event.code === 'ArrowLeft') {
          //rotate snake counter-clockwise
          data.angle += data.rotateSpeed
          data.headmovement.object3D.rotation.z = data.angle

          
        }
        if (event.code === 'ArrowRight') {
          //rotate snake counter-clockwise
          data.angle -= data.rotateSpeed
          data.headmovement.object3D.rotation.z = data.angle
        }
      }) 
  },

  tick: function  (_t, _dt) {

    let el = this.el;
    let data = this.data;

    //Modulo for rotation angles
    const maxRotation = 2*Math.PI;

    //clamp number
    const cylinderMin = -0.5*1.1;
    const cylinderMax = 0.5*1.1;
    const radiansmax = 2*Math.PI;
    const moveZ = 0.1;

    //const radiansmax = 2*Math.PI;
    const clamp = (num, cylinderMin, cylinderMax) => Math.min(Math.max(num, cylinderMin), cylinderMax);

    //horizontal movement
    data.orbit.object3D.rotation.y -= data.movement * Math.cos(data.angle);
    data.orbit.object3D.rotation.y = ((data.orbit.object3D.rotation.y % maxRotation) + maxRotation) % maxRotation; 

    //vertical movement clamped at top and bottom
    data.orbit.object3D.position.y += data.movement * Math.sin(data.angle); 
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