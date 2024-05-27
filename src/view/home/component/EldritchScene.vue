<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import GLBModel from "@/assets/dungeon/classes/GLBModel.js";

export default{
  name: "EldritchScene",
  data(){
    return{
      // Intentionally blank
      // https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3/65732553
      sculptureCredits: "https://sketchfab.com/3d-models/simple-spotted-jellyfish-baked-animation-d5006697ad3c4bc1ac814110cde19af2",
    };
  },
  mounted(){
    this.init();
    document.body.appendChild(this.renderer.domElement);
    this.animate();
  },
  beforeUnmount(){
    document.body.removeChild(this.renderer.domElement);

  },
  methods: {
    init(){
      this.scene = new THREE.Scene();
      this.setRenderer();
      this.setCamera();
      this.setLighting();
      this.setFloor();
      this.setStatue();

      window.addEventListener("resize", this.onWindowResize);

    },
    setRenderer(){
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("three-scene-canvas").appendChild(this.renderer.domElement);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
    },
    setCamera(){
      this.camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          1000);
      this.camera.position.set(7,2,1);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 2;
      this.controls.maxDistance = 10;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.target.set(0, 0, 0);
      this.controls.update();
    },
    setLighting(){
      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
      hemiLight.color.setHSL( 0.6, 1, 0.6 );
      hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
      hemiLight.position.set( 0, 50, 0 );
      this.scene.add( hemiLight );

      this.spotlight = new THREE.SpotLight(0xd68c8b, 20000);
      this.spotlight.position.set(2.5, 5, 2.5);
      this.spotlight.angle = Math.PI / 6;
      this.spotlight.penumbra = 1;
      this.spotlight.decay = 2;
      this.spotlight.distance = 0;
      this.spotlight.castShadow = true;
      this.spotlight.shadow.mapSize.width = 1024;
      this.spotlight.shadow.mapSize.height = 1024;
      this.spotlight.shadow.camera.near = 1;
      this.spotlight.shadow.camera.far = 10;
      this.spotlight.shadow.focus = 1;

      // ==== Trying spotlight texture =====
      const loader = new THREE.TextureLoader();
      loader.load(
          "/textures/space.jpg",
          (texture) => {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace;
            this.spotlight.map = texture;

          });

      // ===================================
      this.scene.add(this.spotlight);
      this.lightHelper = new THREE.SpotLightHelper(this.spotlight);
      this.scene.add(this.lightHelper);
    },
    setFloor(){
      this.floorGeometry = new THREE.PlaneGeometry(200,200);
      this.floorMaterial = new THREE.MeshPhongMaterial({color: 0x223a4a});
      this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
      this.floor.position.set(0, - 1, 0);
      this.floor.rotation.x = -Math.PI / 2;
      this.floor.receiveShadow = true;
      this.scene.add(this.floor);
    },
    setStatue(){
      const loader = new GLTFLoader();
      loader.load("/models/jellyfish.glb", (glb) => {
        const model = glb.scene;

        model.traverse((node) => {
          if(node.isMesh){
            node.material.color.set(0xec7a9b);
            node.material.emissive.set(0xec7a9b);
            node.material.transparent = true;
            node.material.opacity = 0.75;
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        this.scene.add(model);
        this.mixer = new THREE.AnimationMixer(model);

        const clips = glb.animations;
        const clip = THREE.AnimationClip.findByName(clips, "Loop-400");
        const action = this.mixer.clipAction(clip);
        action.play();
      });
      // For timing animations
      this.clock = new THREE.Clock();

    },
    animate(){
      requestAnimationFrame(this.animate);
      const time = performance.now() / 3000;

      // =============================
      // prevent calling if mixer is undefined
      if(this.mixer){
        this.mixer.update(this.clock.getDelta());
      }
      //==============================

      this.spotlight.position.x = Math.cos(time) * 2.5;
      this.spotlight.position.z = Math.sin(time) * 2.5;

      this.lightHelper.update();

      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize(){
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}

</script>

<template>
  <div class="scene">
    <div id="three-scene-canvas"></div>
  </div>
</template>

<style scoped>

</style>