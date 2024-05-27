<script>
import axios from "axios";

export default{
  name: "WorkerInfoSheetView",
  props: {
    workerInfo: {
      type: Object,
      default: () => ({worker: null, qualifications: []}),
      validator: function(value){
        return(
            value.hasOwnProperty("worker")
            && value.hasOwnProperty("qualifications")
            && typeof value.worker === "object"
            && Array.isArray(value.qualifications)
        );
      }
    }
  },
  data(){
    return{
      craftsMap: [],
      gradesMap: [],
      qualificationsMap: []
    }
  },
  created(){
    this.getMappings();
  },
  methods: {
    async getMappings(){
      try{
        const backendURL = import.meta.env.VITE_API_MANAGEMENT_MAPPINGS;
        const response = await axios.get(backendURL);
        const mappings = response.data;
        this.craftsMap = this.mapToArray(mappings.craft);
        this.gradesMap = this.mapToArray(mappings.grade);
        this.qualificationsMap = this.mapToArray(mappings.qualification);
      }
      catch(error){
        console.error("Error getting mappings from backend");
      }
    },
    mapToArray(map){
      return Object.entries(map).map(([name, id]) => ({name, id}));
    },
    getNameById(array, id){
      const item = array.find(item => item.id === id);
      return item ? item.name : "None";
    },
    qualificationsSortedByExpiration(){
      if(!this.workerInfo || !this.workerInfo.qualifications){
        return [];
      }
      return [...this.workerInfo.qualifications].sort((a, b) => {
        // Null expirations go last
        if(a.expiration === null){
          return 1;
        }
        if(b.expiration === null){
          return -1;
        }
        return new Date(a.expiration) - new Date(b.expiration);
      })
    },
    getExpirationHighlight(expirationDate) {
      if (!expirationDate) {
        return ''; // No expiration date, no special styling
      }
      const today = new Date();
      const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
      const expiration = new Date(expirationDate);

      if (expiration < today) {
        return 'bg-red-500'; // Past expiration date
      }
      else if (expiration <= oneYearFromNow) {
        return 'bg-yellow-500'; // Expiring within the next year
      }
      // No special styling if the date is more than one year away
      return '';
    }
  }
}
</script>

<template>
  <div v-if="workerInfo && workerInfo.worker" class="grid place-items-center p-4 border-solid border-2 border-black w-full">
    <div class="justify-self-start w-[100px] h-[100px] p-3 border-dashed border-2 border-indigo-500">
      <p>QR Code</p>
    </div>
    <p class="text-2xl">{{ workerInfo.worker.lastName }}, {{ workerInfo.worker.firstName }}</p>
    <br class="border-b border-gray-500 w-full"/>

    <div class="border-b border-gray-500 w-3/4 place-items-center"/>
    <p class="text-xl"><i>{{getNameById(gradesMap, workerInfo.worker.gradeId)}} {{getNameById(craftsMap, workerInfo.worker.craftId)}}</i></p>

    <div class="w-full h-full mt-4 p-2 border-solid border-1 border-red-500">
      <div>
        <p class="text-left">{{workerInfo.worker.phone}}</p>
        <p>{{workerInfo.worker.email}}</p>
      </div>
    </div>

    <div class="w-full mt-4 text-center border-collapse">
      <table class="w-full justify-items-center">
        <thead class="text-xl bg-gray-300">
          <tr>
            <th>Qualification</th>
            <th>Assigned</th>
            <th>Completed</th>
            <th>Expires</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="workerInfo.qualifications && workerInfo.qualifications.length"
              v-for="(qualification, index) in qualificationsSortedByExpiration()"
              :key="qualification.qualificationId">
            <td>{{getNameById(qualificationsMap, qualification.qualificationId)}}</td>
            <td>{{qualification.assignedOn}}</td>
            <td>{{qualification.completedOn || "N/A"}}</td>
            <td :class="getExpirationHighlight(qualification.expiration)">{{qualification.expiration || "N/A"}}</td>
          </tr>
        <tr v-else>
          <td colspan="4">No qualifications found</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<style scoped>

</style>