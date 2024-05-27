<script>

export default{
  name: "MainNav",
  components: {

  },
  data(){
    // Must return a plain JavaScript object
    return{
      menuItems: [
        {
          text: "Resumé",
          url: "/resume"
        },
        {
          text: "Skills",
          url: "/skills"
        },
        {
          text: "Contact",
          url: "/contact"
        },
      ],
      projectsMobileDropdownVisible: false
    }
  },
  methods: {
    toggleProjectsMobileDropdownVisibility(){
      this.projectsMobileDropdownVisible = !this.projectsMobileDropdownVisible;
    },
    closeDropdown(){
      this.projectsMobileDropdownVisible = false;
    }
  }
}
</script>

<template>
  <header class="w-full text-sm h-16">
    <div class="fixed top-0 left-0 w-full h-16 bg-peach-black z-10">
      <!-- h-full == full height of parent -->
      <!-- border-b == bottom border 1 pixel in length-->
      <!-- mx-auto == margin-auto, center content in the parent -->
      <div class="flex h-full flex-nowrap border-b border-solid border-peach-pink px-2 md:px-8 mx-auto">
        <!-- :href == v-bind:href, v-bind not technically necessary -->
        <router-link to="/" class="flex h-full items-center text-l md:text-xl text-peach-pink md:text-white">
          Matthew Peach
        </router-link>

        <!---------------- START of code for Medium and Larger screens ------------------------>
        <nav class="hidden md:flex ml-6 md:ml-12 h-full">
          <!-- list-none == Do not add dots next to list elements -->
          <ul class="flex h-full list-none text-md md:text-lg text-white">
            <!-- v-for == Vue for-loop -->
            <!-- first:ml-0 == only apply this to the first element-->
            <li v-for="menuItem in menuItems" v-bind:key="menuItem.text" class="ml-9 h-full first:ml-0">
              <!-- menuItem is replaced -->
              <router-link v-bind:to="menuItem.url" class="flex h-full items-center py-2.5">
                {{menuItem.text}}
              </router-link>
            </li>

            <!-- Projects Dropdown Menu -->
            <li class="flex ml-9 h-full items-center py-2.5">
              <div class="relative group">
                <router-link to="/projects">
                  Projects
                </router-link>
                <div class="grid grid-rows-5 gap-2 absolute rounded-b-lg p-2 bg-peach-black invisible group-hover:visible w-[250px]">
                  <router-link to="/projects/aerial" class="hover:bg-peach-peach hover:text-black transition duration-300">
                    Aerial Image Classifier
                  </router-link>
                  <router-link to="/projects/cryptography" class="hover:bg-peach-peach hover:text-black transition duration-300">
                    Cryptography
                  </router-link>
                  <router-link to="/projects/game" class="hover:bg-peach-peach hover:text-black transition duration-300">
                    Projects Island
                  </router-link>
<!--                  <router-link to="/projects/dungeon" class="hover:bg-peach-peach hover:text-black transition duration-300">-->
<!--                    Dungeon Game-->
<!--                  </router-link>-->
                  <router-link to="/projects/qualmanagement" class="hover:bg-peach-peach hover:text-black transition duration-300">
                    Qual Management Demo
                  </router-link>
                  <router-link to="/projects/algorithms" class="hover:bg-peach-peach hover:text-black transition duration-300">
                    Algorithm Animations
                  </router-link>
                </div>
              </div>
            </li>
            <!-- End of Projects Dropdown Menu -->
          </ul>
        </nav>
        <!---------------- END of code for Medium and Larger screens ------------------------>

        <!---------------- START of code for Small screens ------------------------>
        <nav class="flex md:hidden ml-3 md:ml-12 h-full w-full">
          <!-- list-none == Do not add dots next to list elements -->
          <ul class="flex h-full list-none text-md md:text-lg text-white">
            <!-- v-for == Vue for-loop -->
            <!-- first:ml-0 == only apply this to the first element-->
            <li v-for="menuItem in menuItems" v-bind:key="menuItem.text" class="ml-3 h-full first:ml-0">
              <!-- menuItem is replaced -->
              <router-link v-bind:to="menuItem.url" class="flex h-full items-center py-2.5">
                {{menuItem.text}}
              </router-link>
            </li>
            <li>
              <button @click="toggleProjectsMobileDropdownVisibility()" class="ml-3 h-full">
                Projects
              </button>
            </li>
          </ul>


          <div v-if="projectsMobileDropdownVisible" class="absolute justify-items-center rounded-b-xl bg-peach-black text-white p-2 top-16 z-10 right-0">
            <ul>
              <li>
                <router-link @click.native="closeDropdown" to="/projects/aerial">
                  Aerial Image Classifier
                </router-link>
              </li>
              <hr class="border-t mx-2 pt-2 pb-2 border-peach-pink">
              <li>
                <router-link @click.native="closeDropdown" to="/projects/cryptography">
                  Cryptography
                </router-link>
              </li>
<!--              <hr class="border-t mx-2 pt-2 pb-2 border-peach-pink">-->
<!--              <li>-->
<!--                <router-link @click.native="closeDropdown" to="/projects/game">-->
<!--                  Game-->
<!--                </router-link>-->
<!--              </li>-->
<!--              <hr class="border-t mx-2 pt-2 pb-2 border-peach-pink">-->
<!--              <li>-->
<!--                <router-link @click.native="closeDropdown" to="/projects/dungeon">-->
<!--                  Dungeon Game-->
<!--                </router-link>-->
<!--              </li>-->
<!--              <li>-->
<!--                <router-link @click.native="closeDropdown" to="/projects/qualmanagement">-->
<!--                  Qual Management Demo-->
<!--                </router-link>-->
<!--              </li>-->
              <hr class="border-t mx-2 pt-2 pb-2 border-peach-pink">
              <li>
                <router-link @click.native="closeDropdown" to="/projects/algorithms">
                  DFS/BFS Animation
                </router-link>
              </li>
            </ul>
          </div>
          <!-- End of Projects Dropdown Menu -->

        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>