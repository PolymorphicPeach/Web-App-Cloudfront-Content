<script>
import axios from "axios";
import Chart from 'chart.js/auto';

export default{
  name: "AerialClassificationView",
  data(){
    return{
      staticMapSrc: "",
      latitude: 36.85,
      longitude: -75.97,
      zoom: 15,
      chartData: null,
      chart: null,
      errorMessage: "",
    }
  },
  mounted(){
    this.getMap();

  },
  methods: {
    async getMap(){
      if(this.validateCoordinates()) {
        try {
          const backendURL = import.meta.env.VITE_API_STATIC_MAP;

          const response = await axios.post(backendURL,
              {
                latitude: this.latitude,
                longitude: this.longitude,
                zoom: this.zoom
              },
              {
                responseType: 'arraybuffer'
              }
          );
          const imageBytes = response.data;
          this.staticMapSrc = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(imageBytes)))}`;
        }
        catch (error) {
          console.error("Error sending data to backend: ", error);
        }
      }
      else{
        this.errorMessage = "Invalid coordinate values."
      }
    },
    async submitForPrediction(){
      await this.sendMapToBackend();
      await this.renderChart();
    },
    async sendMapToBackend(){
      try{
        const backendURL = import.meta.env.VITE_API_AERIAL;

        const response = await axios.post(backendURL,
            {
              latitude: this.latitude,
              longitude: this.longitude,
              zoom: this.zoom
            });
        this.chartData = response.data;
      }
      catch(error){
        console.error("Error sending image to backend: ", error);
      }
    },
    async renderChart(){
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
<!--  <div class="md:container mx-auto mt-1">-->
<!--    &lt;!&ndash; Row 1: Form and Map &ndash;&gt;-->
<!--    <div class="flex flex-col md:flex-row gap-1">-->
<!--      &lt;!&ndash; Column 1: Longitude/Latitude form &ndash;&gt;-->
<!--      <div class="md:w-1/2">-->
<!--        <div class="max-w-md mx-auto p-6 bg-peach-black rounded-md shadow-md">-->
<!--          <form ref="locationForm" @submit.prevent="getMap">-->
<!--            <div class="mb-4">-->
<!--              <label for="latitude" class="block text-peach-peach text-sm font-bold mb-2">latitude:</label>-->
<!--              <input v-model="latitude" type="number" id="latitude" name="latitude" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 appearance-none" step="any" required>-->
<!--              <p class="text-peach-peach text-xs mt-1">Valid range: -90 to 90</p>-->
<!--            </div>-->
<!--            <div class="mb-4">-->
<!--              <label for="longitude" class="block text-peach-peach text-sm font-bold mb-2">longitude:</label>-->
<!--              <input v-model="longitude" type="number" id="longitude" name="longitude" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 appearance-none" step="any" required>-->
<!--              <p class="text-peach-peach text-xs mt-1">Valid range: -180 to 180</p>-->
<!--            </div>-->
<!--            <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>-->
<!--            <button type="submit" class="w-full bg-peach-pink text-peach-black p-3 rounded-md hover:bg-peach-peach transition duration-300">Show Location</button>-->
<!--          </form>-->
<!--          <form @submit.prevent="submitForPrediction" class="mt-2">-->
<!--            <button type="submit" class="w-full bg-peach-pink text-peach-black p-3 rounded-md hover:bg-peach-peach transition duration-300">Get Prediction</button>-->
<!--          </form>-->
<!--        </div>-->
<!--      </div>-->
<!--      &lt;!&ndash; Column 2: Static map display &ndash;&gt;-->
<!--      <div class="w-full bg-red-500 md:w-1/2  h-min-[300px]">-->
<!--        <div class="flex items-center justify-center h-full">-->
<!--          <img class="w-full h-full" :src="staticMapSrc"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash; Row 2: Chart &ndash;&gt;-->
<!--    <div class="flex flex-col md:flex-row gap-1">-->
<!--      <div class="w-full max-h-[500px] mx-auto">-->
<!--        <canvas id="chartCanvas"></canvas>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


  <div class="flex flex-wrap mt-1 mx-auto md:container">
    <!-- Row 1: Form and Map -->
    <div class="flex flex-col md:flex-row gap-1 w-full">
      <!-- Column 1: Longitude/Latitude form -->
      <div class="flex-1">
        <div class="max-w-md mx-auto p-6 bg-peach-black rounded-md shadow-md">
          <form ref="locationForm" @submit.prevent="getMap">
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
            <button type="submit" class="w-full bg-peach-pink text-peach-black p-3 rounded-md hover:bg-peach-peach transition duration-300">Show Location</button>
          </form>
          <form @submit.prevent="submitForPrediction" class="mt-2">
            <button type="submit" class="w-full bg-peach-pink text-peach-black p-3 rounded-md hover:bg-peach-peach transition duration-300">Get Prediction</button>
          </form>
        </div>
      </div>
      <!-- Column 2: Static map display -->
      <div class="flex-1 min-h-[300px]">
        <div class="flex items-center justify-center h-full">
          <img :src="staticMapSrc" class="max-w-full max-h-full object-cover">
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