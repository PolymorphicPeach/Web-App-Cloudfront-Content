<script>
import axios from "axios";
import SearchResultView from "@/view/projects/domain/qual_management_demo/qual_management_views/SearchResultView.vue";

export default {
  name: "WorkerSearchView",
  components: {
    SearchResultView: SearchResultView
  },
  data() {
    return {
      workers: [],
      selectedWorkers: [],
      crafts: [],
      selectedCraftId: null,
      grades: [],
      selectedGradeId: null,
      qualifications: [],
      selectedQualificationId: null,
      enteredFirstName: "",
      enteredLastName: "",
      searchResults: []
    }
  },
  created(){
    this.getMappings();
  },
  mounted(){

  },
  methods: {
    async advancedSearch(){
      const backendURL = import.meta.env.VITE_API_WORKER_SEARCH;

      const searchCriteria = {
        craftId: this.selectedCraftId,
        gradeId: this.selectedGradeId,
        qualificationId: this.selectedQualificationId
      };

      if(this.enteredFirstName.trim()){
        searchCriteria.firstName = this.enteredFirstName
      }

      if(this.enteredLastName.trim()){
        searchCriteria.lastName = this.enteredLastName;
      }

      try{
        const response = await axios.post(backendURL, searchCriteria);
        this.searchResults = response.data;
      }
      catch(error){
        console.log("Error performing advanced worker search: ", error);
      }
    },
    async getMappings(){
      try{
        const backendURL = import.meta.env.VITE_API_MANAGEMENT_MAPPINGS;
        const response = await axios.get(backendURL);
        const mappings = response.data;
        this.crafts = this.mapToArray(mappings.craft);
        this.grades = this.mapToArray(mappings.grade);
        this.qualifications = this.mapToArray(mappings.qualification);
      }
      catch(error){
        console.error("Error getting mappings from backend");
      }
    },
    mapToArray(map){
      return Object.entries(map).map(([name, id]) => ({name, id}));
    },
  }
}
</script>

<template>
  <div class="grid grid-rows-3 justify-start bg-teal-300 p-8 m-6">
    <div>
      <p class="text-2xl"><u>Worker Management</u></p>
    </div>

    <div class="grid grid-cols-2 p-3">
      <div>
        <label for="first-name-input">First Name: </label>
        <input id="first-name-input" v-model="enteredFirstName" placeholder="Enter first name">
      </div>
      <div>
        <label for="last-name-input">Last Name: </label>
        <input id="last-name-input" v-model="enteredLastName" placeholder="Enter last name">
      </div>
    </div>

    <div class="grid grid-cols-3 p-3">
      <div>
        <!-- Craft Dropdown -->
        <label for="craft-dropdown">Craft: </label>
        <select v-model="selectedCraftId" id="craft-dropdown">
          <option value="null">N/A</option>
          <option v-for="craft in crafts" :key="craft.id" :value="craft.id">{{ craft.name }}</option>
        </select>
      </div>

      <div>
        <!-- Grade Dropdown -->
        <label for="grade-dropdown">Grade: </label>
        <select v-model="selectedGradeId" id="grade-dropdown">
          <option value="null">N/A</option>
          <option v-for="grade in grades" :key="grade.id" :value="grade.id">{{ grade.name }}</option>
        </select>
      </div>

      <div>
        <!-- Qualification Dropdown -->
        <label for="qualification-dropdown">Qualification: </label>
        <select v-model="selectedQualificationId" id="qualification-dropdown">
          <option value="null">N/A</option>
          <option v-for="qualification in qualifications" :key="qualification.id" :value="qualification.id">{{ qualification.name }}</option>
        </select>
      </div>
    </div>

    <div class="p-2">
      <button type="submit" class="pt-1 pb-1 pl-2 pr-2 rounded-md bg-pink-100 hover:bg-pink-400 transition duration-300" @click="advancedSearch()">Search</button>
    </div>
  </div>

  <SearchResultView :search-results="searchResults"/>

</template>

<style scoped>

</style>