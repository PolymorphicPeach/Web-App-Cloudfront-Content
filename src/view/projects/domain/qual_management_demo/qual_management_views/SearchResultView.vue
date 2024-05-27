<script>
import WorkerInfoSheetView
  from "@/view/projects/domain/qual_management_demo/qual_management_views/WorkerInfoSheetView.vue";
import axios from "axios";

export default{
  name: "SearchResultView",
  props:{
    searchResults: Array
  },
  components: {
    WorkerInfoSheetView: WorkerInfoSheetView
  },
  data(){
    return{
      selectedResults: [],
      workerInfoCheckbox: null,
      workerInfo: null,
      qualifications: [],
      selectedQualifications: []
    };
  },
  created(){
    this.getMappings();
  },
  methods: {
    toggleSelection(result){
      const index = this.selectedResults.indexOf(result);
      if(index > -1){
        // Remove the entry if already selected
        this.selectedResults.splice(index, 1);
      }
      else{
        this.selectedResults.push(result);
      }
      this.$emit("selected-results", this.selectedResults);
    },
    selectAll(){
      if (this.selectedResults.length !== this.searchResults.length) {
        this.selectedResults = [...this.searchResults];
      }
      else {
        // Undo selected if all were selected
        this.selectedResults = [];
      }
      this.$emit("selected-results", this.selectedResults);
    },
    toggleWorkerInfoCheckbox(result){
      if(this.workerInfoCheckbox === result){
        this.workerInfoCheckbox = null;
        this.workerInfo = null;
      }
      else{
        this.workerInfoCheckbox = result;
        this.fetchWorkerDetails(result);
      }
    },
    async fetchWorkerDetails(worker){
      try{
        const backendURL = import.meta.env.VITE_API_GET_WORKER_INFO_SHEET;
        axios.post(backendURL, worker).then(response => {
          this.workerInfo = response.data;
          console.log(response);
        });
      }
      catch(error){
        console.error("Error getting worker info sheet from backend")
      }
    },
    async getMappings(){
      try{
        const backendURL = import.meta.env.VITE_API_MANAGEMENT_MAPPINGS;
        const response = await axios.get(backendURL);
        const mappings = response.data;
        this.qualifications = this.mapToArray(mappings.qualification);
      }
      catch(error){
        console.error("Error getting mappings from backend");
      }
    },
    mapToArray(map){
      return Object.entries(map).map(([name, id]) => ({name, id}));
    },
    filterQualifications() {
      // If "N/A" is selected, clear other selections
      if (this.selectedQualifications.includes('null')) {
        this.selectedQualifications = ['null'];
      }
    },
    extractWorkerIds(){
      return this.selectedResults.map(worker => worker.id);
    },
    async assignTraining(){
      try{
        const assignmentList = {
          workerIds: this.extractWorkerIds(),
          // already mapped
          qualificationIds: this.selectedQualifications,
        };

        console.log(assignmentList);

        const backendURL = import.meta.env.VITE_API_ASSIGN_TRAINING;
        const response = await axios.post(backendURL, assignmentList);
      }
      catch(error){
        console.log("Error assigning qualifications to workers");
      }
    }
  }
}

</script>

<template>
  <!-- Probably refactor later -->
  <div class="grid grid-rows-3 grid-cols-2 m-6 p-2 bg-peach-peach">
    <div class="row-span-1 col-span-1 p-2">
      <p>Selected Workers: {{this.selectedResults.length}}</p>
      <p>Selected Qualifications: {{this.selectedQualifications.length}}</p>
    </div>

    <div class="row-span-1 col-span-1 p-2">
      <p>Select Qualifications to Assign</p>
    </div>

    <div class="row-span-2 col-span-1 justify-items-center justify-self-start h-full w-full">
      <button class="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
              @click="assignTraining">
        Assign Qualifications
      </button>
    </div>

    <div class="col-span-1 row-span-2">
      <select multiple v-model="selectedQualifications" id="qualification-dropdown" @change="filterQualifications">
        <option disabled value="null">N/A</option>
        <option v-for="qualification in qualifications" :key="qualification.id" :value="qualification.id">
          {{ qualification.name }}
        </option>
      </select>
    </div>

    </div>


  <div class="grid grid-cols-2 m-6">
      <div>
        <button class="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                @click="selectAll">
          Toggle Select All
        </button>

        <div v-if="searchResults && searchResults.length">
          <ul>
            <li v-for="(result, index) in searchResults" :key="index" class="flex items-center space-x-2">

              <div @click="toggleSelection(result)"
                   class="flex-grow cursor-pointer p-2 my-2 border-2 hover:bg-gray-200"
                   :class="{'bg-blue-300':
                   selectedResults.includes(result)}">
                {{ result.lastName }}, {{ result.firstName }}
              </div>

              <label class="flex items-center">
                <input id="showDetailsCheckbox"
                       type="checkbox"
                       :checked="workerInfoCheckbox === result"
                       @change="() => toggleWorkerInfoCheckbox(result)">
              </label>
            </li>
          </ul>
        </div>
      <div v-else>
        No results
      </div>
    </div>

    <div>
      <WorkerInfoSheetView :worker-info="workerInfo"/>
    </div>


  </div>

</template>

<style scoped>

</style>