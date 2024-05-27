<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Floor from '@/assets/dungeon/classes/Floor.js'
import HighlightSquare from "@/assets/dungeon/classes/HighlightSquare.js";
import Wall from "@/assets/dungeon/classes/Wall.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import DungeonController from "@/view/projects/domain/dungeon/component/DungeonController.vue";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import GLBModel from "@/assets/dungeon/classes/GLBModel.js";
import WorkInProgress from "@/view/projects/domain/dungeon/component/WorkInProgress.vue"

export default {
  name: "DungeonGameView",
  components: {
    DungeonController,
    WorkInProgress,

  },
  data(){
    return{
      // Intentionally not using THREE.js here
      dungeonObjects: [],
      walls: [],
      actors: [],
      animationClock: null,
      selectedUnit: "",
    }
  },
  beforeMount(){
    this.animationClock = new THREE.Clock();
  },
  mounted(){
    this.configureScene();
    this.configureRenderer();
    this.configureCamera();
    this.configureControls();
    this.configureRaycaster();
    this.configureLights();
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
    //                        Animations
    // =============================================================
    animate(){
      requestAnimationFrame(this.animate);
      const time = performance.now() / 3000;
      // ==========================================================

      // ---- Update Animations ----
      this.playActorAnimations();

      // ---- Update Raycaster ----
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // ==========================================================
      this.renderer.render(this.scene, this.camera);
    },
    playActorAnimations(){
      const delta = this.animationClock.getDelta();

      this.actors.forEach(actor => {
          actor.mixer.update(delta);

      })
    },
    // =============================================================
    //                   Initial Configurations
    // =============================================================
    populateScene(){
      this.scene.add(new Floor({width: 20, height: 20}).group);

      // I'll be moving this later...
      this.selectorSquare = new HighlightSquare();
      this.scene.add(this.selectorSquare.mesh);

      // Models
      this.configureModels();
    },
    configureScene(){
      this.scene = new THREE.Scene();
      this.sceneContainer = document.getElementById("sceneContainer");
    },
    configureRenderer(){
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.sceneContainer.offsetWidth, this.sceneContainer.offsetHeight);
      this.sceneContainer.appendChild(this.renderer.domElement);
    },
    configureControls(){
      // Set controls after appending to child
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.update();
    },
    configureCamera(){
      this.camera = new THREE.PerspectiveCamera(40,
          this.sceneContainer.offsetWidth / this.sceneContainer.offsetHeight,
          0.1,
          1000);
      this.camera.position.z += 50;
    },
    configureRaycaster(){
      this.mouse = new THREE.Vector2(0,0);
      this.raycaster = new THREE.Raycaster();
      this.raycaster.setFromCamera(this.mouse, this.camera);
    },
    configureModels(){
      const loader = new GLTFLoader();
      loader.load("/models/devil.glb", (glb) => {
        this.archetypalDevilModel = glb.scene;
        this.archetypalDevilAnimations = glb.animations;
      });
    },
    configureLights(){
      const hemisphereLight = new THREE.HemisphereLight(0xfffff, 0xfffff,2);
      hemisphereLight.color.setHex(0xfffff);
      hemisphereLight.groundColor.setHex(0xeaeaea);
      hemisphereLight.position.set(0, 30, 0);
      this.scene.add(hemisphereLight);
    },

    // =============================================================
    //                      Event Listeners
    // =============================================================
    addEventListeners(){
      this.sceneContainer.addEventListener("resize", this.onWindowResize);
      this.sceneContainer.addEventListener("mousemove", this.updateMousePosition);
      this.sceneContainer.addEventListener("mousedown", this.clickOnGrid);
    },
    removeEventListeners(){
      this.sceneContainer.removeEventListener("resize", this.onWindowResize);
      this.sceneContainer.removeEventListener("mousemove", this.updateMousePosition);
      this.sceneContainer.removeEventListener("mousedown", this.clickOnGrid);
    },
    // =============================================================
    //                          Events
    // =============================================================
    updateMousePosition(event){
      event.preventDefault();

      const rectangle = this.renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rectangle.left;
      const y = event.clientY - rectangle.top;
      this.mouse.x = (x / this.sceneContainer.clientWidth) * 2 - 1;
      this.mouse.y = (y / this.sceneContainer.clientHeight) * -2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      // ----- Use Raycaster to update highlighted square ------
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      intersects.forEach(intersect => {
        if(intersect.object.name === "floorPlane"){
          const highlightSquarePosition = new THREE.Vector3()
              .copy(intersect.point)// (3.5, 0, -2.3)
              .floor()              // (3.0, 0, -3.0) -- Middle coordinate of the square whose top left corner is 3, -3
              .addScalar(0.5);   // Offset because hightlight will be drawn in the center of that square
          // Draw highlight
          if(this.selectorSquare){
            this.selectorSquare.mesh.position.set(highlightSquarePosition.x, 0, highlightSquarePosition.z);
          }
        }
      });
    },
    clickOnGrid(){
      const objectExists = this.dungeonObjects.find(existingObject => {
        return(existingObject.getPosition().x === this.selectorSquare.mesh.position.x
          && existingObject.getPosition().z === this.selectorSquare.mesh.position.z);
      });

      if(!objectExists){
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        intersects.forEach(intersect => {
          if(intersect.object.name === "floorPlane"){
            const dungeonItem = this.addDungeonItem(this.selectorSquare.mesh.position);

            if(dungeonItem){
              this.dungeonObjects.push(dungeonItem);
              this.scene.add(dungeonItem.getMesh());
            }
          }
        });
      }
      else{
        console.log("space already occupied")
      }
    },
    addDungeonItem(selectedPosition){
      switch(this.selectedUnit){
        case "Wall":
          const wall = new Wall();
          wall.setPosition(selectedPosition);
          wall.getMesh().position.y += 0.5;
          this.walls.push(wall);
          return wall;

        case "Devil":
          const devil = new GLBModel(
              SkeletonUtils.clone(this.archetypalDevilModel),
              this.archetypalDevilAnimations,
              selectedPosition,
              "devil"
          );
          devil.setAnimation("Idle");
          this.actors.push(devil);
          return devil;

        default:
          return null;
      }
    },
    setSelectedUnit(selectedUnit){
      this.selectedUnit = selectedUnit;
    },
  }
}
</script>


<template>

  <div class="relative flex z-0 justify-center h-screen w-screen">
    <div id="sceneContainer" class="absolute flex flex-col items-center justify-start w-full h-full md:h-3/4 md:w-3/4 mt-0 pt-0"></div>

    <div>
      <!-- "selected-unit" is emission name-->
      <DungeonController @selected-unit="setSelectedUnit"/>
    </div>

    <div>
      <WorkInProgress/>
    </div>


  </div>
</template>

<style>

</style>