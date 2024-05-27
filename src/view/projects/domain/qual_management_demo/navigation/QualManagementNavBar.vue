<script>
export default{
  name: "QualManagementNavBar",
  data(){
    return {
      currentView: "about" // default view
    }
  },
  methods: {
    changeView(view) {
      this.currentView = view;
    }
  }
}
</script>

<template>
  <nav class="bg-peach-peach">
    <h1 class="text-xl md:text-2xl mb-2 ml-2">Qualification Management Demo</h1>
    <div class="w-3/4 flex flex-cols-3 justify-left gap-4 mx-4">
      <div>
        <button @click="$emit('change-view', 'about')"
                class="text-white text-sm md:text-md bg-peach-black rounded p-2">
          About
        </button>
      </div>

      <div>
        <button @click="$emit('change-view', 'add-worker')"
                class="text-white text-sm md:text-md bg-peach-black rounded p-2">
          Add Workers
        </button>
      </div>

      <div>
        <button @click="$emit('change-view', 'worker-search')"
                class="text-white text-sm md:text-md bg-peach-black rounded p-2">
          Worker Management
        </button>
      </div>

    </div>
  </nav>

</template>

<style scoped>

</style>