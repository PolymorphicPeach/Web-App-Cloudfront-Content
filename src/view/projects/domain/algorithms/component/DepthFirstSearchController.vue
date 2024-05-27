<script>
export default{
  name: "DepthFirstSearchController",
  emits: ["mode", "inserting", "reset"],
  data(){
    return{
      mode: "dfsFind",
      inserting: "Start",
      reset: false,
    }
  },
  methods: {
    emitMode(){
      this.$emit("mode", this.mode);
    },
    emitInserting(){
      this.$emit("inserting", this.inserting);
    },
  }
}
</script>

<template>
  <div class="flex flex-col bg-peach-black w-screen align-items-left p-2">
    <div class="m-1">
      <label for="mode" class="text-white p-2">Mode:</label>
      <select id="mode" class="rounded-md p-1" v-model="mode" @change="emitMode">
        <option value="dfsFind">Find by depth-first-search</option>
        <option value="bfsFind">Find by breadth-first-search</option>
      </select>
    </div>

    <div class="m-1">
      <label for="inserting" class="text-white p-2">Insert:</label>
      <select id="inserting" class="rounded-md p-1" v-model="inserting" @change="emitInserting">
        <option value="Start">Starting Position</option>
        <option value="Obstacle">Obstacle</option>
        <option value="Goal">Goal</option>
      </select>
    </div>

  </div>

</template>

<style scoped>

</style>