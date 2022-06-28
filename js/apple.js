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
        //this.tick = AFRAME.utils.throttleTick(this.tick, 5, this);

        // create random co-ordinate for Apple
        // ensure no collision with Snake before creating

        //el.object3D.position.set(1, 2, 3)

        // alert("X: " + applePosition.x)
        // alert("Y: " + applePosition.y )
        // alert("Z: " + applePosition.z )


    },

    update: function () {
        let el = this.el;
        let data = this.data;
        
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
