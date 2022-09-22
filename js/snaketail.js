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
       
    },


    tick: function (_t, _dt) {
    }
  });