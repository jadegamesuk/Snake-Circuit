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
  
      document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
          
          let scene = document.querySelector('a-scene');
          //let elthis = new THREE.Vector3( data.orbit.object3D.rotation.y, 1.6, el.object3D.position.z);

            //Create Snake Body
              data.bodyCount++;
              let SnakeBodyCount = "Body"+ data.bodyCount

              ballbody = document.createElement('a-sphere');

              var worldPosition = new THREE.Vector3();
              el.object3D.getWorldPosition(worldPosition)

              ballbody.setAttribute('geometry', 'radius', 0.05)
              ballbody.setAttribute('position',worldPosition);
              ballbody.setAttribute('material','color','Firebrick')
              ballbody.setAttribute('id', SnakeBodyCount )
              scene.appendChild(ballbody)  
                            
              alert(SnakeBodyCount);
          };
      })


      document.addEventListener('keyup', event => {
        if (event.code === 'Enter') {
          
          //change colour of snake body black as test

          let SnakeBodyCount = "Body"+ data.bodyCount
          let SnakeBodyCount_JS = "#"+SnakeBodyCount

            alert(SnakeBodyCount_JS )
          const sceneEl = document.querySelector('a-scene');
          let detail = sceneEl.querySelector(SnakeBodyCount_JS).setAttribute('material','color','white') ;                     
              
          };
      })


    }
  });