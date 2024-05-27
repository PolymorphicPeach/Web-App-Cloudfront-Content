<script>

import axios from "axios";
import Chart from "chart.js/auto";
import ProjectsView from "@/view/projects/ProjectsView.vue"

export default{
  name: "SkillsView",
  components: {ProjectsView},
  data(){
    return{
      chartData: null,
      chartMedium: null,
      chartSmall: null,
      screenSize: window.innerWidth,
    }
  },
  computed:{
    isSmallScreen(){
      return this.screenSize <= 600;
    }
  },
  beforeMount(){


  },
  mounted(){
    window.addEventListener("resize", this.updateScreenSize);
    this.getChartData();
  },
  beforeUnmount(){
    window.removeEventListener("resize", this.updateScreenSize);
  },
  methods: {
    updateScreenSize(){
      this.screenSize = window.innerWidth;
    },
    getChartData(){
      const backendUrl = "/api/skills"
      try{
        const response = axios.get(backendUrl)
            .then(response => {
              this.chartData = response.data;

              console.log(response)

              this.renderChart();
            });
      }
      catch(error){
        console.error("Error getting data from backend: ", error);
      }
    },
    renderChart(){
      // Destroy pre-existing charts
      if(this.chartMedium){
        this.chartMedium.destroy();
      }
      if(this.chartSmall){
        this.chartSmall.destroy();
      }

      const labels = this.chartData.map(skill => skill.skill);
      const data = this.chartData.map(skill => skill.count);

      const canvasMedium = document.getElementById("canvasMedium");
      const canvasSmall = document.getElementById("canvasSmall");

      const ctxMedium = canvasMedium.getContext("2d");
      const ctxSmall = canvasSmall.getContext("2d");

      this.chartMedium = new Chart(ctxMedium, {
        type: "polarArea",
        data:{
          labels: labels,
          datasets: [
            {
              data: data,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom"
            },
            title: {
              display: true,
              text: "Skills used in Projects"
            }
          }
        }
      });

      this.chartSmall = new Chart(ctxSmall, {
        type: "polarArea",
        data:{
          labels: labels,
          datasets: [
            {
              data: data,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "left",
              display: true,
              labels: {
                usePointStyle: true,
                font:{
                  size: 10,
                }
              }
            },
            title: {
              display: true,
              text: "Skills used in Projects"
            }
          }
        }
      });


    }
  }
}

</script>

<template>
  <!---------------------- Medium and Larger Screens ----------------------->
  <div class="hidden md:grid grid-cols-2 pt-3">
    <div class="pt-5 pl-5">
      <p>
        Welcome to my "Skills" page! Here, I've listed various skills that I've utilized in my projects that you can check out on GitHub. It's a reflection of the diverse technologies I've explored and applied in different contexts.
      </p>
      <br>
      <p>
        The number of times a skill is mentioned doesn't necessarily correlate with my level of expertise. For instance, you might notice that I've used Python frequently. While this is true, it's essential to understand that the frequency of usage doesn't imply that it's the skill I'm "best" with. It just means that I have a lot of samples available online.
      </p>
      <br>
      <p>
        Java is the programming language that I have the most experience with. Its usage in my projects often corresponds to larger and more complex endeavors.
      </p>
      <br>
      <p>
        Each skill listed has its own merits and is employed based on project requirements. Whether it's Python, JavaScript, or any other technology, I strive to adapt and learn as projects demand.
      </p>
    </div>
    <div>
      <canvas class="w-full h-full" id="canvasMedium"></canvas>
    </div>

  </div>

  <!---------------------- Smaller Screens ----------------------->
  <div class="grid md:hidden custom-grid gap-1">
    <div class="w-full h-full">
      <canvas id="canvasSmall"></canvas>
    </div>
    <div class="pl-2 pr-2 pb-10">
      <p>
        Welcome to my "Skills" page! Here, I've listed various skills that I've utilized in my projects that you can check out on GitHub. It's a reflection of the diverse technologies I've explored and applied in different contexts.
      </p>
      <br>
      <p>
        The number of times a skill is mentioned doesn't necessarily correlate with my level of expertise. For instance, you might notice that I've used Python frequently. While this is true, it's essential to understand that the frequency of usage doesn't imply that it's the skill I'm "best" with. It just means that I have a lot of samples available online.
      </p>
      <br>
      <p>
        Java is the programming language that I have the most experience with. Its usage in my projects often corresponds to larger and more complex endeavors.
      </p>
      <br>
      <p>
        Each skill listed has its own merits and is employed based on project requirements. Whether it's Python, JavaScript, or any other technology, I strive to adapt and learn as projects demand.
      </p>
    </div>
  </div>
  <div>
    <ProjectsView v-if="isSmallScreen"/>
  </div>
</template>

<style scoped>

</style>