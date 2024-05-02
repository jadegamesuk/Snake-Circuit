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
            
/*           let fruitPool = event.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)[0].substring(6);
             let fullpoolName = "pool__" + fruitPool;

          let TTT = document.querySelector('#fruit_' + fruitPool ).object3D.rotation;
            TTT.y += 10;
            console.log("-+-+-+-+-+-+-+-+-+-+-+-+-")
            console.log("TEST is: " , TTT) 
            firstFruit = document.querySelector('#fruit_' + fruitPool ).components[fullpoolName].requestEntity();
            
            document.querySelector('#fruit_'+ fruitPool).components[fullpoolName].returnEntity(firstFruit);
             firstFruit = document.querySelector('#fruit_' + fruitPool ).components[fullpoolName].requestEntity();
*/
      
            console.log("******************************************")
            console.log("GET FROM POOL");

            //Get random fruit from pool
            let randomFruitFromList = fruitList[Math.floor(Math.random() * fruitList.length)];
            let correctFruitPool = 'pool__' + randomFruitFromList.substring(6);

            firstFruit = document.querySelector('#' + randomFruitFromList ).components[correctFruitPool].requestEntity();

            console.log("GOT FROM POOL: " + correctFruitPool);
            console.log("******************************************")

            console.log("Set Fruit Position:");
            console.log("******************************************")
            console.log("POSITION: " , document.querySelector('#' + randomFruitFromList ).object3D.position );
            
            // copy MVMT.js code to get fruit moving along gameworld
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

            console.log("xAxis: " + xAxis)
            //Final Animation
            //let fruitRotation = [xAxis, data.orbit.object3D.rotation.y, data.orbit.object3D.rotation.z]
            //data.orbit.setAttribute('animation__fruit', 'property: rotation; to: 0, `${xAxis}`, 0; easing: easeOutElastic' );
            data.orbit.setAttribute('animation__fruit', `property: rotation; to: 0 ${xAxis*10} 0; easing: easeOutElastic; elasticity: 1000 ` );


/*            
            //console.log("Selected Fruit: " + randomFruitFromList + " & POOL NAME IS " + correctFruitPool )

             //get fruit from pool
             console.log("******************************************")
             console.log("GET " + randomFruitFromList + " FROM POOL")
             console.log("******************************************")
             let FruitWorldPosition = new THREE.Vector3();

             let fruitID = document.querySelector('#' + randomFruitFromList)
             firstFruit = fruitID.components[correctFruitPool].requestEntity();

             fruitID.className = "fruit"
 
             fruitID.object3D.position.set(el.object3D.getWorldPosition(FruitWorldPosition).x + 50, 
                                           getRandomArbitrary(1.1, 1.9),
                                           el.object3D.getWorldPosition(FruitWorldPosition).z );
             
             console.log(" FRUIT X: " + fruitID.object3D.position.x + 
                         " FRUIT Y: " + fruitID.object3D.position.y + 
                         " FRUIT Z: " + fruitID.object3D.position.z)
*/
            //adding event listener
            el.addEventListener('hitstart', fruitCollisionHandler);            
    })

    /*
    el.addEventListener("hitend", function fruitEndCollisionHandler(event) {


        console.log("COLLISION OVER")
    })
    */

    
    },

    tick: function() {
/*
        let data = this.data;

        if (data.fruitlerp == true)
        {
            
            let el = this.el;
            let data = this.data;

             function lerp(position, targetPosition, amount) {
                // update position by 20% of the distance between position and target position
                  position += (targetPosition - position) * amount;
                  return position;
                } 


            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
                } 

            //X-Axis Info
            let xAxis = data.orbit.object3D.rotation.y - data.movement * Math.random() ;
            xAxis = data.orbit.object3D.rotation.y - getRandomArbitrary(0, data.movement);
            xAxis = ((xAxis % maxRotation) + maxRotation) % maxRotation;

            //Y-Axis Info
            let yAxis = data.orbit.object3D.position.y + data.movement * Math.random();
            yAxis = clamp(yAxis, cylinderMin, cylinderMax);

            //Z-Axis
            //Figure this out later

            let fruitRotation = new THREE.Vector3();
            //fruitRotation = [data.orbit.object3D.rotation.x, xAxis, -0.1];
            //  console.log("Rotation: " , data.orbit.object3D.rotation);
            //  console.log("Rot2: ", xAxis)
            data.orbit.object3D.rotation.y = lerp(data.orbit.object3D.rotation.y, xAxis, 0.10);

            //console.log("/*-/*-/*-/*-/*-/*-/*-/*-/*-/*-/*-/*-/*-/*-/*-/*-")
            
            if (data.orbit.object3D.rotation.y >= xAxis)
            {
                data.fruitlerp = false;
            }
        

        }
*/
    },
    

});
