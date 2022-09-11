AFRAME.registerComponent('snaketail', {
    schema: {
      orbit: {type: 'selector', default: '#gameworld'},
      zDist: {type: 'selector', default: '#snake'}
    }, 

    init: function () {
        //let el = this.el;
        //let data = this.data;
        this.tick = AFRAME.utils.throttleTick(this.tick, 5, this);
        this.entities = document.querySelectorAll('a-sphere');
    },

    update: function () {

      let el = this.el;
      let data = this.data;
       
      document.addEventListener('keyup', event => {
  
        if (event.code === 'Space') {

          this.entities = document.querySelectorAll('a-sphere');
          
          let scene = document.querySelector('a-scene');
            //Create First Snake Body
            if (data.bodyCount === 0)
            {
              data.bodyCount++;
              SnakeBodyCount = "Body"+ data.bodyCount
              SnakeBodyCount_Counter = "Body"+ data.bodyCount;

              window.SnakeBodyCount = document.createElement('a-sphere');
              let worldPosition = new THREE.Vector3();

              el.object3D.getWorldPosition(worldPosition);

              window.SnakeBodyCount.setAttribute('geometry', 'radius', 0.05)
              window.SnakeBodyCount.setAttribute('position',worldPosition);
              window.SnakeBodyCount.setAttribute('material','color','Firebrick')
              window.SnakeBodyCount.setAttribute('id', SnakeBodyCount_Counter )
              scene.appendChild(window.SnakeBodyCount)   
            }
            //Append new snake section to end of snake body
            else
            {
              //get previous snakebody location
              let worldPosition = window.SnakeBodyCount.getAttribute('position');
             
              data.bodyCount++;
              SnakeBodyCount = "Body"+ data.bodyCount;
              SnakeBodyCount_Counter = "Body"+ data.bodyCount;


              //el.object3D.getWorldPosition(worldPosition)
              window.SnakeBodyCount = document.createElement('a-sphere');
              
              window.SnakeBodyCount.setAttribute('geometry', 'radius', 0.05)
              window.SnakeBodyCount.setAttribute('position',worldPosition);
              window.SnakeBodyCount.setAttribute('material','color','Firebrick')
              window.SnakeBodyCount.setAttribute('id', SnakeBodyCount_Counter )
              scene.appendChild(window.SnakeBodyCount);
            }                       
          }; 
      })
    },
    tick: function (_t, _dt) {
      let el = this.el;
      let data = this.data;
      this.entities = document.querySelectorAll('a-sphere');
      
      let move = 0.3 //*(1/this.entities.length);

       //Have snake body follow snake head
        if (data.bodyCount > 0)
        {   
              
          for (let i = 1; i < this.entities.length; i++) {

            let worldPosition = new THREE.Vector3();
            this.entities[i-1].object3D.getWorldPosition(worldPosition);
            this.entities[i].object3D.position.lerp(worldPosition, move);
          } 

        }
    }
  });