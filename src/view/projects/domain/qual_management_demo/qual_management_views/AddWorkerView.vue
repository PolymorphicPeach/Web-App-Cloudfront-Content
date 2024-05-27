<script>
import axios from "axios";

export default{
  name: "AddWorkerView",
  data(){
    return{
      // There is a check on the backend as well.
      maxWorkers: 100,
      numWorkers: 100,
      maxQualificationStatuses: 1000,
      numQualificationStatuses: 1000,
      crafts: [],
      grades: [],
      enteredFirstName: "",
      enteredLastName: "",
      selectedCraftId: null,
      selectedGradeId: null,
    }
  },
  watch: {
    enteredFirstName(val){
      if(val.length > 255){
        this.enteredFirstName = val.slice(0, 255);
      }
    },
    enteredLastName(val){
      if(val.length > 255){
        this.enteredLastName = val.slice(0, 255);
      }
    }
  },
  created(){
    this.getNumWorkers();
    this.getNumQualStatus();
    this.getMappings();
  },
  methods: {
    async deleteAllWorkers(){
      try{
        const backendURL = import.meta.env.VITE_API_DELETE_ALL_WORKERS;
        axios.post(backendURL).then(response => {
          this.getNumWorkers();
          this.getNumQualStatus();
        })
      }
      catch(error){
        console.error("Error deleting all workers in database");
      }
    },
    async addWorker(){
      try{
        const worker = {
          craftId: this.selectedCraftId,
          gradeId: this.selectedGradeId,
          firstName: this.enteredFirstName.trim(),
          lastName: this.enteredLastName.trim()
        }

        const backendURL = import.meta.env.VITE_API_ADD_DEMO_WORKER;
        axios.post(backendURL, worker).then(response =>{
          this.getNumWorkers();
        });
      }
      catch(error){
        console.error("Error adding demo worker");
      }
    },
    async addRandomWorkers(){
      try{
        const backendURL = import.meta.env.VITE_API_ADD_RANDOM_WORKERS;
        axios.post(backendURL).then(response => {
          // Update numWorkers
          this.getNumWorkers();
          this.getNumQualStatus();
        });
      }
      catch(error){
        console.error("Error adding random workers to database");
      }
    },
    async getNumWorkers(){
      try{
        const backendURL = import.meta.env.VITE_API_WORKER_COUNT;
        const response = await axios.get(backendURL);
        this.numWorkers = response.data;
      }
      catch(error){
        console.error("Error getting number of workers from backend");
      }
    },
    async getNumQualStatus(){
      try{
        const backendURL = import.meta.env.VITE_API_QUAL_STATUS_COUNT;
        const response = await axios.get(backendURL);
        this.numQualificationStatuses = response.data;
      }
      catch(error){
        console.error("Error getting qualification status count from backend");
      }
    },
    async getMappings(){
      try{
        const backendURL = import.meta.env.VITE_API_MANAGEMENT_MAPPINGS;
        const response = await axios.get(backendURL);
        const mappings = response.data;
        this.crafts = this.mapToArray(mappings.craft);
        this.grades = this.mapToArray(mappings.grade);
      }
      catch(error){
        console.error("Error getting mappings from backend");
      }
    },
    mapToArray(map){
      return Object.entries(map).map(([name, id]) => ({name, id}));
    }
  }
}
</script>

<template>
  <div class="grid grid-rows-10 bg-teal-300 gap-3 m-4 p-4">
    <div>
      <p class="text-2xl"><u>Add Workers</u></p>
    </div>

    <div>
      <p class="text-xl"><i>Number of workers: {{numWorkers}} / {{maxWorkers}}</i></p>
    </div>
    <div>
      <p class="text-xl"><i>Number of Qualification Records: {{numQualificationStatuses}} / {{maxQualificationStatuses}}</i></p>
    </div>

    <div>
      <label for="first-name-input">First Name: </label>
      <input id="first-name-input" v-model="enteredFirstName" placeholder="Enter first name">
    </div>

    <div>
      <label for="last-name-input">Last Name: </label>
      <input id="last-name-input" v-model="enteredLastName" placeholder="Enter last name">
    </div>

    <div>
      <label for="craft-dropdown">Craft: </label>
      <select v-model="selectedCraftId" id="craft-dropdown">
        <option value="null">N/A</option>
        <option v-for="craft in crafts" :key="craft.id" :value="craft.id">{{ craft.name }}</option>
      </select>
    </div>

    <div>
      <label for="grade-dropdown">Grade: </label>
      <select v-model="selectedGradeId" id="grade-dropdown">
        <option value="null">N/A</option>
        <option v-for="grade in grades" :key="grade.id" :value="grade.id">{{ grade.name }}</option>
      </select>
    </div>

    <div>
      <p><i>*A random email and phone number will be used.</i></p>
    </div>

    <div>
      <button type="submit" class="px-2 py-2 rounded-md bg-pink-100 hover:bg-pink-400 transition duration-300"
              @click="addWorker">
        Add Worker
      </button>
    </div>

    <div>
      <button type="submit" class="px-2 py-2 rounded-md bg-pink-100 hover:bg-pink-400 transition duration-300"
              @click="addRandomWorkers">
        Add 20 random workers
      </button>
    </div>

    <div>
      <button type="submit" class="px-2 py-2 rounded-md bg-pink-100 hover:bg-pink-400 transition duration-300"
              @click="deleteAllWorkers">
        Delete All Workers
      </button>
    </div>

  </div>
</template>

<style scoped>

</style>