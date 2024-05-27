<script>
export default {
  name: "DungeonController",
  data(){
    return{
      visible: false,
      selectedUnit: "",
    }
  },
  methods: {
    toggleVisibility(){
      this.visible = !this.visible;
    },
    emitSelectedUnit(){
      this.$emit("selected-unit", this.selectedUnit);
    }
  }
}

</script>

<template>
  <div class="absolute inline-flex flex-col h-0 z-2 inset-y-0 right-0 p-3 w-1/2 md:w-1/4">
    <!-- There is a checkbox hidden under the slider, hence so much "peer" -->
    <!-- https://flowbite.com/docs/forms/toggle/ -->
    <label class="inline-flex items-center cursor-pointer p-3 bg-peach-pink">
      <input type="checkbox" value="" @change="toggleVisibility" class="sr-only peer">
      <div class="relative w-11 h-6 bg-gray-200
           peer-focus:outline-none
           peer-focus:ring-4
           peer-focus:ring-blue-300
           dark:peer-focus:ring-blue-800
           rounded-full
           peer
           dark:bg-gray-700
           peer-checked:after:translate-x-full
           rtl:peer-checked:after:-translate-x-full
           peer-checked:after:border-white
           after:content-['']
           after:absolute after:top-[2px]
           after:start-[2px] after:bg-white
           after:border-gray-300 after:border
           after:rounded-full
           after:h-5
           after:w-5
           after:transition-all
           dark:border-gray-600
           peer-checked:bg-blue-600">

      </div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Show Menu
      </span>
    </label>

    <div v-if="visible" class="z-1 w-full bg-peach-pink">

      <form class="max-w-sm mx-auto">
        <select id="units" v-model="selectedUnit" @change="emitSelectedUnit"
                class="bg-gray-50
                       border border-gray-300
                       text-gray-900 text-sm rounded-lg
                       focus:ring-blue-500
                       focus:border-blue-500
                       block w-full p-2.5
                       dark:bg-gray-700
                       dark:border-gray-600
                       dark:placeholder-gray-400
                       dark:text-white
                       dark:focus:ring-blue-500
                       dark:focus:border-blue-500">
          <option disabled value="">Select a Unit</option>
          <option value="Wall">Wall</option>
          <option value="Devil">Devil</option>
        </select>
      </form>

    </div>

  </div>

</template>

<style scoped>

</style>