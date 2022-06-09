AFRAME.registerComponent('food', {
    schema: {
        orbit: {type: 'selector', default: '#gameworld'},
        appleCount: {type: 'number', default: 0},
        food: {type: 'selector', default: 'apple'}
    },

    init: function () {
        let el = this.el;
        let data = this.data;

        let scene = document.querySelector('a-scene');
        this.tick = AFRAME.utils.throttleTick(this.tick, 5, this);

        //this.entities = document.querySelectorAll('a-gltf-model');

        //create apple in random location
        
        data.appleCount++;
        
        AppleBodyCount = "Apple"+ data.appleCount
        AppleBodyCount_Counter = "Apple"+ data.appleCount;

        let worldPosition = new THREE.Vector3();
        el.object3D.getWorldPosition(worldPosition);

        //alert( Object.entries(worldPosition) );
        window.AppleBodyCount = document.createElement('a-gltf-model')      

        window.AppleBodyCount.setAttribute('position', worldPosition);
        window.AppleBodyCount.object3D.scale.set(0.02, 0.02, 0.02);

        window.AppleBodyCount.setAttribute('src', '/assets/Apple.glb');
        window.AppleBodyCount.setAttribute('id', AppleBodyCount_Counter )
        //alert(Object.entries(worldPosition))
        scene.appendChild(window.AppleBodyCount)   
    },

    update: function () {
        let el = this.el;
        let data = this.data;
        let scene = document.querySelector('a-scene');

        AppleBodyCount = "Apple"+ data.appleCount
        AppleBodyCount_Counter = "Apple"+ data.appleCount;

        //window.AppleBodyCount.object3D.rotation.z += 1;

    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
