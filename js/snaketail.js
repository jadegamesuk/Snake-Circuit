AFRAME.registerComponent('snaketail', {
    schema: {
      orbit: {type: 'selector', default: '#gameworld'},
      zDist: {type: 'selector', default: '#snake'},
      bodyCount: {type: 'number', default: 0}
    }, 

    init: function () {
        let el = this.el;
        let data = this.data;
        this.tick = AFRAME.utils.throttleTick(this.tick, 5, this);
    },

    update: function () {

      let el = this.el;
      let data = this.data;
       
      document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
          
          let scene = document.querySelector('a-scene');

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
          };
      })
    },

    tick: function (_t, _dt) {
      let el = this.el;
      let data = this.data;
  
      let move = 0.005;
        //Have snake body follow snake head
        if (data.bodyCount > 0)
        {
          let SnakeBodyCount_JS = "#"+"Body"+data.bodyCount

          //get world position of snake head
          var worldPosition = new THREE.Vector3();
          el.object3D.getWorldPosition(worldPosition);

          //const sceneEl = document.querySelector('a-scene');

          //move towards world position (via lerp)
          ballbody.object3D.position.lerp(worldPosition, 0.3)

        }


      //change colour of snake body black with Enter key
      document.addEventListener('keyup', event => {
        if (event.code === 'Enter') {
          
          let SnakeBodyCount = "Body"+ data.bodyCount
          let SnakeBodyCount_JS = "#"+SnakeBodyCount

           // alert(SnakeBodyCount_JS )
          const sceneEl = document.querySelector('a-scene');
          let detail = sceneEl.querySelector(SnakeBodyCount_JS).setAttribute('material','color','black');   
          };
      })


    }
  });