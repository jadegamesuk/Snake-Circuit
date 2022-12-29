AFRAME.registerComponent('init-fruit', {

    init: function () {

        let el = this.el;
        this.tick = AFRAME.utils.throttleTick(this.tick, 20, this);

        //get list of fruit
        let fruitclassList = [];
        let fruitList = [];

         fruitclassList = document.getElementsByClassName("fruit");
        document.querySelectorAll(`[id^="fruit_"]`).forEach(element => fruitList.push(element.id));

        

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
          } 

        //create first initial fruit
        //let randomFruitFromList = fruitList[Math.floor(Math.random() * fruitList.length)];
        //console.log("FRUIT: " , randomFruitFromList)
        //let randomFruitPool = "pool__" + randomFruitFromList.substring(6);


        firstFruit = document.querySelector('#fruit_pineapplepool').components["pool__pineapplepool"].requestEntity();
        //let firstFruit = document.querySelector('#' + randomFruitFromList ).components[randomFruitPool].requestEntity();
        
        el.addEventListener("hitstart", function fruitCollisionHandler(event) {
            //var sceneEl = document.querySelector('a-scene');

            //removing event listener
            el.removeEventListener('hitstart', fruitCollisionHandler);

            //disable AABB debug
            //turn off/on crawling-cursor
            //document.querySelector('#snake').getAttribute('aabb-collider')['debug'] = false
            //document.querySelector('#snake').getAttribute('aabb-collider')['debug'] = false;           
            //document.querySelector('#snake').getAttribute('aabb-collider')['enabled'] = false;            
            
            //return fruit to pool
            
            let fruitPool = event.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)[0].substring(6);
            let fullpoolName = "pool__" + fruitPool;

            firstFruit = document.querySelector('#fruit_' + fruitPool ).components[fullpoolName].requestEntity();
            //console.log("firstFruit" , firstFruit);

            console.log("******************************************")
            console.log("RETURN " + fruitPool + " TO POOL");
            console.log("******************************************")
            //document.querySelector('#fruit_'+ fruitPool).components[fullpoolName].returnEntity(firstFruit);
           //firstFruit = document.querySelector('#fruit_' + fruitPool ).components[fullpoolName].requestEntity();


            //Get random fruit from pool
            let randomFruitFromList = fruitList[Math.floor(Math.random() * fruitList.length)];
            //let randomFruitFromList = fruitList[0];
            let correctFruitPool = 'pool__' + randomFruitFromList.substring(6);
            
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
    },
    

});
