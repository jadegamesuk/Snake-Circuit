AFRAME.registerComponent('snaketail', {
    schema: {
      orbit: {type: 'selector', default: '#gameworld'},
      zDist: {type: 'selector', default: '#snake'},
      bodyCount: {type: 'number', default: 1}
    }, 

    init: function () {
        //let el = this.el;
        //let data = this.data;
        this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);
    },

    update: function () {
    },

    tick: function (_t, _dt) {
      let el = this.el;
      let data = this.data;
  
      //const piMax = 2*Math.PI;
    //clamp number
    //const cylinderMin = -0.5;
    //const cylinderMax = 0.5;


      document.addEventListener('keyup', event => {
        if (event.code === 'Space') {

          
          let scene = document.querySelector('a-scene');
          //let pos = new THREE.Vector3( data.orbit.object3D.rotation.y, (data.zDist.object3D.position.y+data.orbit.object3D.position.y), el.object3D.position.z);
          let elthis = new THREE.Vector3( data.orbit.object3D.rotation.y, 1.6, el.object3D.position.z);
          //let pos = new THREE.Vector3( (data.zDist.object3D.position.y+data.orbit.object3D.position.y),data.orbit.object3D.rotation.y, el.object3D.position.z)
          // This is correct but needs an extra 1.6 added - data.orbit.object3D.position.y,
            //pos.y += 
              
              ballbody = document.createElement('a-sphere');
              
              //let newpos =  data.zDist.getAttribute("position")
              var worldPosition = new THREE.Vector3();
              el.object3D.getWorldPosition(worldPosition)

              ballbody.setAttribute('geometry', 'radius', 0.05)
              ballbody.setAttribute('position',worldPosition);
              ballbody.setAttribute('material','color','Firebrick')
              scene.appendChild(ballbody)                         
              
              data.bodyCount++;   
                 
              //console.log("World position")
              //console.log(worldPosition);
          };
      })
    }
  });