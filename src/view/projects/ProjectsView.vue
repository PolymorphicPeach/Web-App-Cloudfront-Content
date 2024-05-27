<script>
import axios from "axios";

export default{
  name: "ProjectsView",
  data(){
    return{
      projectData: null,
    }
  },
  beforeMount(){
    this.fetchData();
  },
  mounted(){

  },
  methods: {
    async fetchData(){
      try{
        const backendUrl = "/api/projects"
        const response = await axios.get(backendUrl);
        this.projectData = response.data;
      }
      catch(error){
        console.error("Error fetching data: ", error);
      }
    },
    formatSkills(skills){
      // Converts the comma separated strings to an array. Used in the template
      return skills.split(', ').map(skill => skill.trim());
    }
  }
}
</script>

<template>
  <table class="table-auto align-middle border border-spacing-2 border-peach-black pt-2 pb-10 pl-4 pr-4">
    <thead class="bg-peach-peach">
    <tr>
      <th class="border border-peach-black">Name</th>
      <th class="border border-peach-black">Skills Involved</th>
      <th class="border border-peach-black">Link</th>
    </tr>
    </thead>

    <tbody class="bg-gray-300">
    <tr v-for="entry in projectData" :key="entry.id">
      <td class="border border-peach-black">
        <p>{{entry.name}}</p>
      </td>
      <td class="border border-peach-black align-middle">
        <p>{{formatSkills(entry.skills)}}</p>
      </td>
      <td class="border border-peach-black">
        <a :href="entry.link" target="_blank" class="text-blue-500 underline">
          {{entry.link}}
        </a>
      </td>
    </tr>
    </tbody>

  </table>
</template>

<style scoped>

</style>