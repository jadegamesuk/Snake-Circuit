AFRAME.registerComponent('fruit-create', {
    schema: {
        orbit: {type: 'selector', default: '#gameworld'},
        movement: {type: 'number', default: 10.0},
        fruitlerp: {type: 'boolean', default: false}
      },

    init: function () {

        let el = this.el;
        let data = this.data;
        this.tick = AFRAME.utils.throttleTick(this.tick, 20, this);

        //get list of fruit
        let fruitList = [];
        document.querySelectorAll(`[id^="fruit_"]`).forEach(element => fruitList.push(element.id));  

        //select initial fruit to display
        //let randomFruitFromList = fruitList[Math.floor(Math.random() * fruitList.length)];
        //let randomFruitPool = "pool__" + randomFruitFromList.substring(6);
        //let firstFruit = document.querySelector('#' + randomFruitFromList).components[randomFruitPool].requestEntity();

        el.addEventListener("hitstart", function fruitCollisionHandler(event) {

            //removing event listener
            el.removeEventListener('hitstart', fruitCollisionHandler);
            
     
            //console.log("******************************************")
            //console.log("GET FROM POOL");

            //Get random fruit from pool
            let randomFruitFromList = fruitList[Math.floor(Math.random() * fruitList.length)];
            let correctFruitPool = 'pool__' + randomFruitFromList.substring(6);

            firstFruit = document.querySelector('#' + randomFruitFromList ).components[correctFruitPool].requestEntity();

            const maxRotation = 2*Math.PI;
            const clamp = (num, cylinderMin, cylinderMax) => Math.min(Math.max(num, cylinderMin), cylinderMax);
            const cylinderMin = -0.5*1.1;
            const cylinderMax = 0.5*1.1;

            let xAxis = 0;
            if (Math.random() < 0.5)
            {
                 xAxis = data.orbit.object3D.rotation.y - (data.movement * Math.random() );
                 if (Math.random() < 0.25)
                 {
                    xAxis = ((xAxis % maxRotation) + maxRotation) % maxRotation;
                 }
            }
            else
            {
                 xAxis = data.orbit.object3D.rotation.y + (data.movement * Math.random() ); 
                 if (Math.random() > 0.75)
                 {
                    xAxis = ((xAxis % maxRotation) + maxRotation) % maxRotation;
                 }
            }

            //let xAxis = data.orbit.object3D.rotation.y - getRandomArbitrary(0, data.movement);
            //xAxis = ((xAxis % maxRotation) + maxRotation) % maxRotation;

            //console.log("xAxis: " + xAxis)
            //Final Animation
            //let fruitRotation = [xAxis, data.orbit.object3D.rotation.y, data.orbit.object3D.rotation.z]
            //data.orbit.setAttribute('animation__fruit', 'property: rotation; to: 0, `${xAxis}`, 0; easing: easeOutElastic' );
            data.orbit.setAttribute('animation__fruit', `property: rotation; to: 0 ${xAxis*10} 0; easing: easeOutElastic; elasticity: 1000 ` );

            //adding event listener
            el.addEventListener('hitstart', fruitCollisionHandler);            
    })
    
    },

    tick: function() {

    },
    

});
