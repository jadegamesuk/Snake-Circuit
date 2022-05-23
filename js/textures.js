AFRAME.registerComponent("pbr", {
    init: function() {
      var renderer = this.el.sceneEl.renderer;

      this.el.addEventListener("loaded", e => {
        let mesh = this.el.getObject3D("mesh");
        var loader = new THREE.TextureLoader();
        var textureCombined = loader.load("/assets/Ring/combined.png");
        var textureDiffuse = loader.load('/assets/Ring/albedo.png');
        var textureNormal = loader.load("/assets/Ring/normal.png");
        var textureHeight = loader.load("/assets/Ring/height.png");
        // this is required in order to display ambient occlusion PBR texture correctly
        mesh.geometry.addAttribute( 'uv2', new THREE.BufferAttribute( mesh.geometry.attributes.uv.array, 2 ) );
        
        //textureCombined.repeat.set(2 , 2)
        //textureDiffuse.repeat.set(1 , 3)
        //textureNormal.repeat.set(2 , 2)

        mesh.traverse(function(el) {
          if (el.material) {
            el.material.map = textureDiffuse;
            el.material.map.anisotropy = 16;
            el.material.aoMap = textureCombined;
            el.material.roughnessMap = textureCombined;
            el.material.roughness = 0.9;
            el.material.normalMap = textureNormal;
            el.material.metalness = 0;
            el.material.needsUpdate = true;
            el.material.displacementMap = textureHeight
            el.material.displacementScale = 0.0

          }
        });
      });
    }
  });