<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as YUKA from 'yuka';
import PredefinedPathFish from "@/assets/fish/PredefinedPathFish.js";

export default{
  name: "HomeScene",
  data(){
    return{
      // Intentionally avoiding using many THREE.js references here;
      // https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3/65732553
      animationClock: null,
      yukaTimer: null,
      yukaEntityManager: null,
    };
  },
  beforeMount(){
    this.yukaTimer = new YUKA.Time();
    this.yukaEntityManager = new YUKA.EntityManager();
  },
  mounted(){
    this.configureScene();
    this.configureRenderer();
    this.configureCamera();
    this.configureControls();
    // Configure raycaster if needed
    this.configureLighting();
    this.configureFloor();
    this.configureSky();
    this.populateScene();

    this.addEventListeners();


    this.animate();
  },
  beforeUnmount(){
    if(this.sceneContainer.contains(this.renderer.domElement)){
      this.sceneContainer.removeChild(this.renderer.domElement);
    }
    this.removeEventListeners();
  },
  methods: {
    // =============================================================
    //                   Initial Configurations
    // =============================================================
    configureScene(){
      this.scene = new THREE.Scene();
      this.sceneContainer = document.getElementById("sceneContainer");
    },
    configureRenderer(){
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.sceneContainer.appendChild(this.renderer.domElement);
    },
    configureControls(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 2;
      this.controls.maxDistance = 10;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.target.set(0, 0, 0);
      this.controls.update();
    },
    configureCamera(){
      this.camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      )
      this.camera.position.set(7, 2, 1);
    },
    configureLighting(){
      this.configureHemisphereLight();
      this.configureSpotlight();
    },
    configureHemisphereLight(){
      const hemisphereLight = new THREE.HemisphereLight(
          0xe2a9ad,
          0xffffff,
          0.075);

      this.scene.add(hemisphereLight);
    },
    configureSpotlight(){
      this.spotlight = new THREE.SpotLight(0xd68c8b, 3000);
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

      const loader = new THREE.TextureLoader();
      loader.load("/textures/space.jpg", (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        this.spotlight.map = texture;
      });

      this.spotlightHelper = new THREE.SpotLightHelper(this.spotlight);
      this.scene.add(this.spotlight);
      this.scene.add(this.spotlightHelper);
    },
    configureSky(){
      const vertexShader = `
        varying vec3 vWorldPosition;

        void main() {
          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
      `

      const fragmentShader = `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;

      varying vec3 vWorldPosition;

      void main() {
        float h = normalize( vWorldPosition + offset ).y;
        gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 2.0 );
      }
      `

      const uniforms = {
        "topColor": {
          value: new THREE.Color(0xafb1ad)
        },
        "bottomColor": {
          value: new THREE.Color(0x738abd)
        },
        "offset":{
          value: 33
        },
        "exponent": {
          value: 0.6
        }
      };

      const sky = new THREE.Mesh(
          new THREE.SphereGeometry(200, 32, 32),
          new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.BackSide,
          })
      );

      this.scene.add(sky);
    },
    configureFloor(){
      const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(200, 200),
          new THREE.MeshPhongMaterial({
            color: 0xf2f3dc
          })
      );
      floor.position.set(0, -1, 0);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      this.scene.add(floor);
    },
    // =============================================================
    //                   Populating Scene
    // =============================================================
    populateScene(){
      this.loadJellyfish();
      this.loadFish();
    },
    loadJellyfish(){
      const loader = new GLTFLoader();
      loader.load("/models/jellyfish.glb", (glb) => {
        const model = glb.scene;
        model.position.y += 2;
        model.rotation.x += Math.PI;

        model.traverse((node) => {
          if(node.isMesh){
            node.material.color.set(0x68bed0);
            node.material.emissive.set(0xd989c7);
            node.material.transparent = true;
            node.material.opacity = 0.6;
            node.castShadow = true;
            node.recieveShadow = true;
          }
        });

        this.scene.add(model);
        this.mixer = new THREE.AnimationMixer(model);
        const clips = glb.animations;
        const clip = THREE.AnimationClip.findByName(clips, "Loop-400");
        const action = this.mixer.clipAction(clip);
        action.play();
      });


      this.clock = new THREE.Clock();

    },
    loadFish(){
      const customPathCowfish = [
        {x: -10, y: 0, z: -5},
        {x: 3, y: -0.5, z: 0},
        {x: -5, y: 3, z: 5},
      ]

      const customPathYellowtang = [
        {x: 6, y: 0, z: 0},
        {x: -10, y: 1, z: 8},
        {x: -10, y: 3, z: -5},

      ]

      const customPathBluetang = [
        {x: -5, y: 2, z: 0},
        {x: -3, y: 1, z: 3},
        {x: -3, y: 1, z: -6},
        {x: 10, y: 1, z: 10},
      ]

      const loader = new GLTFLoader();
      loader.load("/models/cowfish.glb", (glb) => {
        const archetypalCowfish = glb.scene;

        const cowfish = new PredefinedPathFish(
            archetypalCowfish,
            0.2,
            customPathCowfish,
            3,
            2,
            2
        );
        this.scene.add(cowfish.model);
        this.yukaEntityManager.add(cowfish.vehicle);
        //this.scene.add(cowfish.getPathlines());
      });

      loader.load("/models/yellowtang.glb", (glb) => {
        const archetypalYellowtang = glb.scene;
        const yellowtang = new PredefinedPathFish(
            archetypalYellowtang,
            0.3,
            customPathYellowtang,
            5,
            2,
            2
        );
        this.scene.add(yellowtang.model);
        this.yukaEntityManager.add(yellowtang.vehicle);
        //this.scene.add(yellowtang.getPathlines());
      });

      loader.load("/models/bluetang.glb", (glb) => {
        const archetypalBluetang = glb.scene;
        const bluetang = new PredefinedPathFish(
            archetypalBluetang,
            0.5,
            customPathBluetang,
            5,
            2,
            2);
        this.scene.add(bluetang.model);
        this.yukaEntityManager.add(bluetang.vehicle);
        //this.scene.add(bluetang.getPathlines());
      });

    },
    // =============================================================
    //                       Animation
    // =============================================================
    animate(){
      requestAnimationFrame(this.animate);
      const time = performance.now() / 3000;
      const yukaDelta = this.yukaTimer.update().getDelta();
      //---------------------------------------------------------
      this.spotlight.position.x = Math.cos(time) * 2.5;
      this.spotlight.position.z = Math.sin(time) * 2.5;
      this.spotlightHelper.update();
      this.yukaEntityManager.update(yukaDelta);

      if(this.mixer){
        this.mixer.update(this.clock.getDelta());
      }


      //---------------------------------------------------------
      this.renderer.render(this.scene, this.camera);
    },
    // =============================================================
    //                      Event Listeners
    // =============================================================
    addEventListeners(){
      window.addEventListener("resize", this.onWindowResize);
    },
    removeEventListeners(){
      window.removeEventListener("resize", this.onWindowResize);
    },
    // =============================================================
    //                          Events
    // =============================================================
    onWindowResize(){
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}

</script>

<template>
  <div id="sceneContainer"></div>
</template>

<style>

</style>