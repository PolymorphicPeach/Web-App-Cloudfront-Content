<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default{
  name: "CaesarCipher",
  data(){
    return{
      screenSize: window.innerWidth,
      // To make a heatmap-like pattern
      heatmap: ["#FF5733", "#FF6F33", "#FF8A33", "#FFA533", "#FFC033", "#FFDB33", "#FFF033"],
      textInput: "",
      maxLength: 500,
      key: 1,
      responseData: null,
      chart: null,
      englishFreqChart: null,
      englishFrequenciesLink: "https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html",
      englishLetterFrequencies: {
        "a": 8.4966,
        "b": 2.0720,
        "c": 4.5388,
        "d": 3.3844,
        "e": 11.1607,
        "f": 1.8121,
        "g": 2.4705,
        "h": 3.0034,
        "i": 7.5448,
        "j": 0.1965,
        "k": 1.1016,
        "l": 5.4893,
        "m": 3.0129,
        "n": 6.6544,
        "o": 7.1635,
        "p": 3.1671,
        "q": 0.1962,
        "r": 7.5809,
        "s": 5.7351,
        "t": 6.9509,
        "u": 3.6308,
        "v": 1.0074,
        "w": 1.2899,
        "x": 0.2902,
        "y": 1.7779,
        "z": 0.2722,
      },
    }
  },
  computed: {
    remainingCharacters(){
      return this.maxLength - this.textInput.length;
    }
  },
  beforeMount(){

  },
  mounted(){
    window.addEventListener("resize", this.updateScreenSize);
    this.renderEnglishFreqChart();
  },
  beforeUnmount(){

  },
  methods: {
    handleInput(){
      if(this.textInput.length > this.maxLength){
        // Slice off extra text
        this.textInput = this.textInput.slice(0, this.maxLength);
      }
    },
    async submitForm(){
      await this.sendTextToBackend();
      await this.renderChart();
    },
    async sendTextToBackend(){
      const payload = {
        plaintext: this.textInput,
        key: this.key,
      };
      try{
        const response = await axios.post(import.meta.env.VITE_API_CAESAR, payload);
        console.log(response);
        this.responseData = response.data;
      }
      catch(error){
        console.error("Error sending data to backend: ", error);
      }
    },
    async renderChart(){
      if(this.chart){
        this.chart.destroy();
      }
      const chartCanvas = document.getElementById("chartCanvas");
      const ctx = chartCanvas.getContext("2d");

      const data = this.responseData.letterFrequency;

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "letter frequency",
              data: data,
              backgroundColor: this.heatmap
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              // Step size of 1 to remove decimals
              stepSize: 1,
              precision: 0,
            }
          },
          plugins:{
            legend:{
              display: false,
            },
            title: {
              display: true,
              text: "Ciphertext Letter Counts",
              font: {
                size: 16,
              }
            }
          }
        }
      });
    },
    async renderEnglishFreqChart(){
      if(this.englishFreqChart){
        this.englishFreqChart.destroy();
      }
      const chartCanvas = document.getElementById("englishFreqCanvas");
      const ctx = chartCanvas.getContext("2d");
      this.englishFreqChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(this.englishLetterFrequencies),
          datasets: [
            {
              label: "Letter Frequencies",
              data: Object.values(this.englishLetterFrequencies),
              backgroundColor: this.heatmap,
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Letter Frequencies in English (Percentage)",
              font: {
                size: 16,
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
            }
          },
        }
      })
    },
    updateScreenSize(){
      this.screenSize = window.innerWidth;
    }
  }
}
</script>

<template>

  <!------------ Form div --------------->
  <div class="container mx-auto mt-2">
    <form @submit.prevent="submitForm" class="max-w mx-auto p-6 bg-peach-black rounded-md shadow-md">
      <p class="text-peach-pink">Input your text and choose a key for encryption. Only latin letters will be encrypted.</p>
      <div class="p-2">
        <textarea v-model="textInput"
                  class="w-full h-40 p-2 border border-peach-pink focus:outline-none focus:border-peach-black rounded resize-none"
                  @input="handleInput"
                  placeholder="Enter plaintext (500 character limit)">
        </textarea>
        <div class="text-peach-pink">
          remaining characters: {{remainingCharacters}}
        </div>
      </div>

      <div class="mt-2">
        <label for="keySelector" class="text-peach-pink">Select a key (1-127): </label>
        <input v-model.number="key" type="number" id="keySelector" min="1" max="127"
               class="border border-peach-pink rounded p-2 focus:outline-none focus:border-peach-black">
      </div>

      <div class="pt-4 pl-2">
        <button type="submit"
                class="text-peach-black font-bold py-1 px-2
              bg-peach-pink border-b-2 border-peach-pink-darker
              hover:bg-peach-pink-lighter hover:border-peach-pink
              rounded">
          Submit
        </button>
      </div>
    </form>
  </div>



  <!------------ Response div --------------->
  <div v-if="responseData" class="container mx-auto p-3">
    <div class="max-w mx-auto text-center p-6 bg-peach-black rounded-md shadow-md">
      <h1 class="text-xl md:text-3xl pb-2 justify-center font-bold text-peach-pink">
        Your Cipher
      </h1>
      <div class="w-full h-40 p-2 text-black bg-white border border-peach-pink rounded resize-none">
        <p v-if="responseData.text">
          {{responseData.text}}
        </p>
      </div>
    </div>
  </div>

  <div class="h-100 w-full">
    <canvas id="chartCanvas" class="h-full w-full"></canvas>
  </div>
  <div class="h-100 w-full">
    <canvas id="englishFreqCanvas" class="h-full w-full"></canvas>
  </div>

  <div class="text-l md:text-xl text-center p-8 pb-10">
    <a :href="englishFrequenciesLink" target="_blank" class="text-blue-500 underline">
      {{englishFrequenciesLink}}
    </a>
  </div>

</template>

<style scoped>

</style>