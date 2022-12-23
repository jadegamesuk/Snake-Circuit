AFRAME.registerComponent('init-fruit', {

    init: function () {

        let el = this.el;
        this.tick = AFRAME.utils.throttleTick(this.tick, 20, this);

        //get list of fruit
        let fruitList = []
        document.querySelectorAll(`[id^="fruit_"]`).forEach(element => fruitList.push(element.id) );

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
          }

        //create first initial apple
        let firstFruit = document.querySelector('#fruit_applepool').components["pool__applepool"].requestEntity();
        document.querySelector('#fruit_applepool').object3D.rotation.z = 0.5;

        el.addEventListener("hitstart", function fruitCollisionHandler(event) {
            
            //removing event listener
            el.removeEventListener('hitstart', fruitCollisionHandler) 
            //disable AABB debug
            //turn off/on crawling-cursor
            //document.querySelector('#snake').getAttribute('aabb-collider')['debug'] = false
            //document.querySelector('#snake').getAttribute('aabb-collider')['debug'] = false;           
            //document.querySelector('#snake').getAttribute('aabb-collider')['enabled'] = false;  

            //spin fruit round fast and shrink,then return fruit back to pool 
            
            

            //return fruit back to pool
            let toCorrectPool = "pool__" + event.target.components["aabb-collider"]["intersectedEls"].map(x => x.id)[0].substring(6);
            console.log("COLLISION. THIS POOL IS " + toCorrectPool )

            document.querySelector('#fruit_'+ event.target.components["aabb-collider"]["intersectedEls"]
                                    .map(x => x.id)[0].substring(6))
                                    .components[toCorrectPool].returnEntity(firstFruit);

            //Get random fruit from pool
            let randomFruitFromList = fruitList[Math.floor(Math.random() * fruitList.length)];
            let correctFruitPool = 'pool__' + randomFruitFromList.substring(6);
            
            //console.log("Selected Fruit: " + randomFruitFromList + " & POOL NAME IS " + correctFruitPool )

             //get fruit from the pool
             let FruitWorldPosition = new THREE.Vector3();

             let fruitID = document.querySelector('#' + randomFruitFromList)
             firstFruit = fruitID.components[correctFruitPool].requestEntity();
             fruitID.object3D.rotation.z = 0.5
             fruitID.className = "fruit"
 
             fruitID.object3D.position.set(el.object3D.getWorldPosition(FruitWorldPosition).x, 
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
