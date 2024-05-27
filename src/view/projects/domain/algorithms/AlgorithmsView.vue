<script>
import GridWindow from "@/view/projects/domain/algorithms/component/GridWindow.vue";
import DepthFirstSearchController from "@/view/projects/domain/algorithms/component/DepthFirstSearchController.vue";

export default{
  name: "AlgorithmsView",
  components: {
    DepthFirstSearchController: DepthFirstSearchController,
    GridWindow: GridWindow,
  },
  data(){
    return{
      mode: "dfsFind",
      inserting: "Start",
      reset: false,
    }
  },
  methods: {
    setMode(mode){
      this.mode = mode;
    },
    setInserting(inserting){
      this.inserting = inserting;
    },
  }
}

</script>

<template>
  <div class="grid grid-cols-2 grid-rows-12 w-screen h-screen">
    <div class="col-span-2 row-span-8 md:row-span-10">
      <GridWindow v-bind:mode="mode" v-bind:inserting="inserting"/>
    </div>

    <div class="col-span-2 row-span-4 md:row-span-2">
      <DepthFirstSearchController @mode="setMode" @inserting="setInserting"/>
    </div>
  </div>
</template>

<style scoped>

</style>