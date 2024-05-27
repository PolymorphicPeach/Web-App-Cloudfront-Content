<script>
import MainNav from "@/view/navigation/MainNav.vue"

export default{
  name: "App",
  components: {
    // Property name and component names are the same for simplicity
    // Can also just leave it as "MainNav" alone, but I'd rather leave it
    // Tailwind will also automatically allow "main-nav", but I'd also rather not...
    MainNav: MainNav
  }
};
</script>

<template>

  <MainNav/>
  <!-- dynamic content is rendered by the router-view here -->
  <router-view />
</template>

<style scoped>

</style>