AFRAME.registerComponent('food', {
    schema: {
        orbit: {type: 'selector', default: '#gameworld2'},
        appleCount: {type: 'number', default: 0},
        food: {type: 'selector', default: '#apple'}
    },

    init: function () {
        this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);
    },

    update: function () {
      
      document.addEventListener('keydown', event => {         
          
        if (event.code === 'KeyQ') {
            let el = this.el;
            let data = this.data;
            
            console.log("X: " + el.object3D.position.x)
            //el.object3D.rotation.y++ use this line to animate apples 
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
            //delete gltf apple
            /*
            console.log("X: " + el.object3D.position.x)
            console.log("Y: " + el.object3D.position.y)
            console.log("Z: " + el.object3D.position.z)
            */

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

              let worldPosition = new THREE.Vector3();
              
              /*
              Replace the below with the old apple variable but
              use the player-wrapper2 to move the apple rather than anything else
              This should fix some weird bugs
              */
              let xAxis = el.object3D.getWorldPosition(worldPosition).x
              let yAxis = getRandomArbitrary(1.1, 1.9);
              let zAxis = el.object3D.getWorldPosition(worldPosition).z   

            document.querySelector('#player-wrapper2').appendChild(entityEl);
            entityEl.setAttribute('position', {x: xAxis, y: yAxis, z: zAxis}); 

             console.log("X: " + xAxis + " Y: " + yAxis + " Z: " + zAxis)
             
             /*
             let rr = document.querySelector('#player-wrapper2').getAttribute('rotation'.y)
             console.log( document.querySelector('#player-wrapper2').getAttribute('rotation').y );
             rr = Number(rr) + 50
              
             document.querySelector('#player-wrapper2').setAttribute('rotation', {x: 0, y:rr, z:0})
            */
           
             // Set score value
             let snakeScore = document.querySelector('#player-wrapper2').getAttribute('score')
             snakeScore = Number(snakeScore) + 5;
             document.querySelector('#player-wrapper2').setAttribute('score', snakeScore)

            // set snake bodycount
            let snakeBodyCount = document.querySelector('#snake').getAttribute('bodyCount')
            snakeBodyCount = Number(snakeBodyCount) + 1;
            document.querySelector('#snake').setAttribute('bodyCount', snakeBodyCount)
 
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
               // window.snakeBodyCount.setAttribute('class','ignore-ray')
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
                //window.snakeBodyCount.setAttribute('class','ignore-ray')
                scene.appendChild(window.snakeBodyCount);
              }                                  
        }
      })
        //Have snake body follow snake head
        if (document.querySelector('#snake').getAttribute('bodyCount') >= 0)
        {   
          this.entities = document.querySelectorAll('a-sphere');
          let move = 0.2 

            for (let i = 1; i < this.entities.length; i++) {

              let worldPosition = new THREE.Vector3();
              this.entities[i-1].object3D.getWorldPosition(worldPosition);
              this.entities[i].object3D.position.lerp(worldPosition, move);
            } 
        }
  }
});

