<script>
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import HighlightSquare from "@/assets/dungeon/classes/HighlightSquare.js";
import Grid from "@/view/projects/domain/algorithms/js/grid/Grid.js";

export default{
  name: "GridWindow",
  props: {
    mode: {
      type: String
    },
    inserting:{
      type: String
    },
  },
  data(){
    return{
      gridSize: 20,
      speedSliderValue: 50,
    }
  },
  computed:{
    computedSleepTime(){
      const maxSleep = 1000;
      const minSleep = 1;
      return maxSleep - ((this.speedSliderValue / 100) * (maxSleep - minSleep));
    }
  },
  beforeMount(){

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
  methods:{
    animate(){
      requestAnimationFrame(this.animate);

      this.renderer.render(this.scene, this.camera);
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
    configureCamera(){
      this.camera = new THREE.PerspectiveCamera(40,
          this.sceneContainer.offsetWidth / this.sceneContainer.offsetHeight,
          0.1,
          1000);
      this.camera.position.y += 40;
    },
    configureControls(){
      // Set controls after appending to child
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.update();
    },
    configureRaycaster(){
      this.mouse = new THREE.Vector2(0,0);
      this.raycaster = new THREE.Raycaster();
      this.raycaster.setFromCamera(this.mouse, this.camera);
    },
    configureLights(){
      const hemisphereLight = new THREE.HemisphereLight(0xfffff, 0xfffff,2);
      hemisphereLight.color.setHex(0xfffff);
      hemisphereLight.groundColor.setHex(0xeaeaea);
      hemisphereLight.position.set(0, 30, 0);
      this.scene.add(hemisphereLight);
    },
    populateScene(){
      this.grid = new Grid(this.gridSize, this.computedSleepTime);
      this.scene.add(this.grid.gridGroup);
      this.scene.add(this.grid.permGroup);
      this.scene.add(this.grid.tempGroup);

      this.selectorSquare = new HighlightSquare();
      this.scene.add(this.selectorSquare.mesh);
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
    // ============================================================
    //                         Events
    // ============================================================
    updateMousePosition(event){
      event.preventDefault();
      const rectangle = this.renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rectangle.left;
      const y = event.clientY - rectangle.top;
      this.mouse.x = (x / this.sceneContainer.clientWidth) * 2 - 1;
      this.mouse.y = (y / this.sceneContainer.clientHeight) * -2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.children);
      intersects.forEach(intersect => {
        if(intersect.object.name === "gridMesh"){
          const highlightSquarePosition = new THREE.Vector3()
              .copy(intersect.point)
              .floor()
              .addScalar(0.5);

          if(this.selectorSquare){
            this.selectorSquare.mesh.position.set(highlightSquarePosition.x, 0, highlightSquarePosition.z);
          }

        }
      });
    },
    clickOnGrid(){
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      if(intersects){
        intersects.forEach(intersect => {
          if(intersect.object.name === "gridMesh"){
            this.grid.addPermPlacement(this.inserting, intersect.point);
          }
        })
      }
    },
    resetGrid(){
      // Remove group from scene to safely delete
      this.scene.remove(this.grid.tempGroup);
      this.scene.remove(this.grid.permGroup);
      // Delete
      this.grid.deleteTempPlacements();
      this.grid.deletePermPlacements();
      // Put the cleared group back into the scene
      this.scene.add(this.grid.tempGroup);
      this.scene.add(this.grid.permGroup);
    },
    startAlgorithm(){
      if(this.mode === "dfsFind"){
        this.grid.beginDepthFirstSearch();
      }
      else if(this.mode === "bfsFind"){
        this.grid.beginBreadthFirstSearch();
      }


    },
    changeSpeed(){
      this.grid.sleepTime = this.computedSleepTime;
    }
  }
}
</script>

<template>
  <div class="grid grid-rows-12 w-full h-full">

    <div id="sceneContainer" class="row-span-11 w-full">

    </div>

    <div class="flex flex-cols">
      <div>
        <button
            type="submit"
            class="bg-green-600 text-white p-2 rounded-md hover:bg-green-900 transition duration-300"
            @click="startAlgorithm">
          Start
        </button>
      </div>

      <div>
        <button
            type="submit"
            class="bg-red-400 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
            @click="resetGrid">
          Reset
        </button>
      </div>

      <div>
        <label for="speed" class="block text-sm font-medium">Algorithm Speed</label>
      </div>

      <div>
        <input id="speed" type="range" value="500" min="0" max="100"
               class="bg-cyan-400 h-2 rounded-lg appearance-none cursor-pointer"
               v-model="speedSliderValue"
               @input="changeSpeed">
      </div>

    </div>


  </div>


</template>

<style scoped>

</style>