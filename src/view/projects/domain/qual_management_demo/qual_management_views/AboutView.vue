<script>
export default {
  name: "AboutView",
  data() {
    return {

    }
  },
}
</script>

<template>
  <p class="m-6 text-2xl"><u>About</u></p>

  <div class="flex flex-row mx-4">
      <p class="text-lg mt-2">
        This is a demo application for tracking worker qualifications. Data is saved in an in-memory database, so there are limits on the amount of workers and qualifications that can be added to the database. You can add new Workers and see the database limits in the Add Workers tab. You can select multiple workers to assign qualifications to in the Worker Management tab.
      </p>

  </div>

</template>

<style scoped>

</style>