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

      document.addEventListener('keydown', event => {         
          if (event.code === 'KeyQ') {
            let el = this.el;
            let data = this.data;
           
            //below rotates apple but collisions not detected for some reason...
            //let maxRotation = Math.random() * 6.2 * (Math.round(Math.random()) ? 1 : -1)   
            //data.orbit.object3D.rotation.y = maxRotation
            //console.log(maxRotation);

            var worldPosition = new THREE.Vector3();
            console.dir("Apple world Z co-ordinate: " + JSON. stringify(el.object3D.getWorldPosition(worldPosition)))
          }
        })
      },

    tick: function (_t, _dt) {

      let el = this.el;
      let data = this.data;
      let scene = document.querySelector('a-scene');

        el.addEventListener("hitstart", function(event) {

          //if collision with apple occurs          
        if (event.target.id == "apple-item")
        {
             //Current apple Z-co-ordinate
            //let appleZ =  event.target.components.position.data.z
            //let snakeZ = el.object3D.position.z
            //console.log("appleZ: " + appleZ + " snakeZ: " + snakeZ )

            //delete gltf apple
            el.parentNode.removeChild(el);
            event.target.id = '#apple-item';

             //create new apple
             let entityEl = document.createElement('a-gltf-model');
             entityEl.setAttribute('src', '#apple');
             entityEl.setAttribute('id', 'apple-item' );
             entityEl.setAttribute('scale', {x: 0.4, y: 0.4, z: 0.4});
             entityEl.setAttribute('food', {orbit: '#player-wrapper2'} );        

              function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
              }
              //const moveZ = 0.1;
              //const moveZ = Math.random() < 0.5 ? 0.1 : 0;
              let worldPosition = new THREE.Vector3();
              
             //(determine if inner or outer wall
              //let innerWall = (document.querySelector('#snake').getAttribute('mvmt')).innerWall;             
              let zAxis = el.object3D.getWorldPosition(worldPosition).z   
              
              //zAxis = Math.random() < 0.5 ? zAxis : (zAxis - moveZ);

              let yAxis = getRandomArbitrary(1.1, 1.9);
              let xAxis = el.object3D.getWorldPosition(worldPosition).x

            document.querySelector('#player-wrapper2').appendChild(entityEl);
            entityEl.setAttribute('position', {x: xAxis, y: yAxis, z: zAxis}); 
            entityEl.setAttribute('scale', {x: 0.4, y: 0.4, z: 0.4}); 
             console.log("X: " + xAxis + " Y: " + yAxis + " Z: " + zAxis)
             document.querySelector('#gameworld2').setAttribute('crawling-cursor', {target: '#apple-item'})

             // Set score value
             let snakeScore = document.querySelector('#player-wrapper2').getAttribute('score')
             snakeScore = Number(snakeScore) + 5;
             document.querySelector('#player-wrapper2').setAttribute('score', snakeScore)

            // set snake bodycount
            let snakeBodyCount = document.querySelector('#snake').getAttribute('bodyCount')
            snakeBodyCount = Number(snakeBodyCount) + 1;
            document.querySelector('#snake').setAttribute('bodyCount', snakeBodyCount)

            // Add to snake body
            this.entities = document.querySelectorAll('a-sphere');
  
              //Create First Snake Body
              if (snakeBodyCount === 0)
              {
                snakeBodyCount++;
                snakeBodyCount = "Body"+ snakeBodyCount
                snakeBodyCount_Counter = "Body"+ snakeBodyCount;
  
                window.snakeBodyCount = document.createElement('a-sphere');
                let worldPosition = new THREE.Vector3();
  
                el.object3D.getWorldPosition(worldPosition);
                
                window.snakeBodyCount.setAttribute('geometry', 'radius', 0.05)
                window.snakeBodyCount.setAttribute('position',worldPosition);
                window.snakeBodyCount.setAttribute('material','color','Firebrick')
                window.snakeBodyCount.setAttribute('id', snakeBodyCount_Counter )
                scene.appendChild(window.snakeBodyCount)   
              }
              //Append new snake section to end of snake body
              else
              {
                //get previous snakebody location
                let worldPosition = window.snakeBodyCount.getAttribute('position');
               
                snakeBodyCount++;
                snakeBodyCount = "Body"+ snakeBodyCount;
                snakeBodyCount_Counter = "Body"+ snakeBodyCount;
   
                //el.object3D.getWorldPosition(worldPosition)
                window.snakeBodyCount = document.createElement('a-sphere');
                
                window.snakeBodyCount.setAttribute('geometry', 'radius', 0.05)
                window.snakeBodyCount.setAttribute('position',worldPosition);
                window.snakeBodyCount.setAttribute('material','color','Firebrick')
                window.snakeBodyCount.setAttribute('id', snakeBodyCount_Counter )
                scene.appendChild(window.snakeBodyCount);
              }                                  
        }
      })
        //Have snake body follow snake head
        if (document.querySelector('#snake').getAttribute('bodyCount') >= 0)
        {   
          this.entities = document.querySelectorAll('a-sphere');
          let move = 0.3 

            for (let i = 1; i < this.entities.length; i++) {

              let worldPosition = new THREE.Vector3();
              this.entities[i-1].object3D.getWorldPosition(worldPosition);
              this.entities[i].object3D.position.lerp(worldPosition, move);
            } 
        }
  }
});

