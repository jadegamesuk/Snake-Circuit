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
              
              //ballbody.setAttribute('id', "SphereID" + data.bodyCount);
              let newpos =  data.zDist.getAttribute("position")

              ballbody.setAttribute('geometry', 'radius', 0.05)
              ballbody.setAttribute('position',newpos);
              ballbody.setAttribute('material','color','firebrick')
              scene.appendChild(ballbody)
              
              
              
              //console.log(pos)
              data.bodyCount++; 
              console.log("ballbody")
              console.log( newpos)
              console.log("ballbodyAttribute: ")
              console.log( ballbody.object3D.position)
              
              console.log("snakehead")
              console.log(data.zDist.getAttribute("position") );
          };

      })
    }
  });