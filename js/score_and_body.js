AFRAME.registerComponent('score_and_body', {
    schema: {
        orbit: {type: 'selector', default: '#player-wrapper2'},
        appleCount: {type: 'number', default: 0}
    },

    init: function () {
        this.tick = AFRAME.utils.throttleTick(this.tick, 20, this);

        let el = this.el;
        //let data = this.data;
        //var sceneEl = document.querySelector('a-scene');
        //let apple_eat = document.querySelector('#apple-crunch');

        el.addEventListener("hitstart", function collisionHandler(event) {
              //if fruit collides with snakehead        
              //play sound of eating apple
              
              //apple_eat.components.sound.playSound();

              let crashCoOrdinates = el.components["aabb-collider"]["intersectedEls"][0].object3D.position // event.target.object3D.position;

              // Set score value
              let snakeScore = document.querySelector('#player-wrapper2').getAttribute('score')
              snakeScore = Number(snakeScore) + 5;
              document.querySelector('#player-wrapper2').setAttribute('score', snakeScore)
  
              // set snake bodycount
              let snakeBodyCount = document.querySelector('#snake').getAttribute('bodyCount')
              snakeBodyCount = Number(snakeBodyCount) + 1;
              document.querySelector('#snake').setAttribute('bodyCount', snakeBodyCount)

              console.log("Snake Body Count: " + snakeBodyCount + " Snake Score: " + snakeScore);

              //increase snake speed
              //document.querySelector('#snake').getAttribute('score_and_body')['appleCount']
              //document.querySelector('#VR-controls').components.mvmtvr.data.movement
              //document.querySelector('#VR-controls').getAttribute('mvmtvr')
              document.querySelector('#VR-controls').getAttribute('mvmtvr')['movement'] += 0.003 
              //console.log("MVMT value is: " + document.querySelector('#VR-controls').getAttribute('components','movement'))


              //Create First Snake Body
                  snakeBodyCount = "Body"+ snakeBodyCount
    
                  window.snakeBodyCount = document.createElement('a-sphere');
                  window.snakeBodyCount.setAttribute('geometry', 'radius', 0.05)
                  window.snakeBodyCount.setAttribute('position',crashCoOrdinates);
                  window.snakeBodyCount.setAttribute('material','src','../assets/scales.jpg')
                  window.snakeBodyCount.setAttribute('id', snakeBodyCount )
                  window.snakeBodyCount.setAttribute('class','ignore-ray')
                 document.querySelector('#snakebodies').appendChild(window.snakeBodyCount) 
        })
           
},

    tick: function (_t, _dt) { 
              //Have snake body follow snake head
              this.entities = document.querySelectorAll('a-sphere');
              if (this.entities.length >= 2)
              {   
                let move = 0.2 + document.querySelector('#VR-controls').getAttribute('mvmtvr')['movement']; 

                  for (let i = 1; i < this.entities.length; i++) {
      
                    let worldPosition = new THREE.Vector3();
                    this.entities[i-1].object3D.getWorldPosition(worldPosition);
                    this.entities[i].object3D.position.lerp(worldPosition, move);
                  } 
              }
           }
      })