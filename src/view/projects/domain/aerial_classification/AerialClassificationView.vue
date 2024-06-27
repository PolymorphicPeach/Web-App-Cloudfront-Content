<script>
import axios from "axios";
import Chart from 'chart.js/auto';

export default{
  name: "AerialClassificationView",
  data(){
    return{
      imageSrc: "",
      latitude: 36.85,
      longitude: -75.97,
      zoom: 15,
      chartData: null,
      chart: null,
      errorMessage: "",
    }
  },
  mounted(){
    this.sendData();
  },
  methods: {
    async sendData(){
      const backendUrl = "https://d24kvwnwbws997.cloudfront.net/api/machine-learning/aerial-classification";
      if(this.validateCoordinates()){
        // Clear variables
        this.imageSrc = null;
        this.chartData = null;

        try{
          const response = await axios.post(backendUrl,
              {
                latitude: this.latitude,
                longitude: this.longitude
              },
              {
                timeout: 10000
              });
          let parsedBody = JSON.parse(response.data.body);

          // extract properties
          const {image, predictions} = parsedBody;
          this.chartData = predictions;
          this.imageSrc = `data:image/jpeg;base64,${image}`;
          this.renderChart();
        }
        catch(error){
          console.error("Error sending data: ", error);
        }
      }
    },
    renderChart(){
      const chartCanvas = document.getElementById("chartCanvas");

      // Destroy pre-existing chart
      if(this.chart){
        this.chart.destroy();
      }

      const labels = Object.keys(this.chartData);
      const values = Object.values(this.chartData);

      const ctx = chartCanvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "pie",
        data:{
          labels: labels,
          datasets:[
            {
              data: values
            }
          ]
        },
        options:{
          responsive: true,
          maintainAspectRatio: true,
        }
      });
    },
    validateCoordinates() {
      const latitude = this.$refs.locationForm.latitude.value;
      const longitude = this.$refs.locationForm.longitude.value;
      const isValidLatitude = !isNaN(latitude) && latitude >= -90 && latitude <= 90;
      const isValidLongitude = !isNaN(longitude) && longitude >= -180 && longitude <= 180;
      return isValidLatitude && isValidLongitude;
    }
  }
}
</script>

<template>
  <div class="flex flex-wrap mt-1 mx-auto md:container">
    <!-- Row 1: Form and Map -->
    <div class="flex flex-col md:flex-row gap-1 w-full">
      <!-- Column 1: Longitude/Latitude form -->
      <div class="flex-1">
        <div class="max-w-md mx-auto p-6 bg-peach-black rounded-md shadow-md">
          <form ref="locationForm" @submit.prevent="sendData">
            <div class="mb-4">
              <label for="latitude" class="block text-peach-peach text-sm font-bold mb-2">Latitude:</label>
              <input v-model="latitude" type="number" id="latitude" name="latitude" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 appearance-none" step="any" required>
              <p class="text-peach-peach text-xs mt-1">Valid range: -90 to 90</p>
            </div>
            <div class="mb-4">
              <label for="longitude" class="block text-peach-peach text-sm font-bold mb-2">Longitude:</label>
              <input v-model="longitude" type="number" id="longitude" name="longitude" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 appearance-none" step="any" required>
              <p class="text-peach-peach text-xs mt-1">Valid range: -180 to 180</p>
            </div>
            <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
            <button type="submit" class="w-full bg-peach-pink text-peach-black p-3 rounded-md hover:bg-peach-peach transition duration-300">Submit</button>
          </form>
        </div>
      </div>
      <!-- Column 2: Static map display -->
      <div class="flex-1 min-h-[300px]">
        <div class="flex items-center justify-center h-full">
          <img :src="imageSrc" class="max-w-full max-h-full object-cover">
        </div>
      </div>
    </div>
    <!-- Row 2: Chart -->
    <div class="flex flex-col md:flex-row gap-1 w-full">
      <div class="w-full max-h-[500px] mx-auto">
        <canvas id="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>