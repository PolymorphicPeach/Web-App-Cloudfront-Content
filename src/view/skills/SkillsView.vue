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
      chart: null,
      chartRendering: false,
      screenSize: window.innerWidth,
      projects: [],
      skillsOverview: [],
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
      const backendUrl = "https://d24kvwnwbws997.cloudfront.net/api/projects";

      try{
        axios.get(backendUrl).then(response => {
          this.projects = JSON.parse(response.data.body);
          this.renderChart("skillOverview");
        });
      }
      catch(error){
        console.error("Error getting data from backend: ", error);
      }
    },
    extractData(whichData){
      const extractedData = [];
      if(this.projects.length === 0){
        return;
      }
      for(const key in this.projects){
        if(whichData === "skillOverview" || whichData === "languages"){
          if(this.projects[key].languages){
            extractedData.push(...this.projects[key].languages);
          }
        }

        if(whichData === "skillOverview" || whichData === "technologies"){
          if(this.projects[key].technologies){
            extractedData.push(...this.projects[key].technologies);
          }
        }

        if(whichData === "skillOverview" || whichData == "techniques"){
          if(this.projects[key].techniques){
            extractedData.push(...this.projects[key].techniques);
          }
        }
      }
      return extractedData;
    },
    async renderChart(type){
      if(this.chartRendering){
        return;
      }
      this.chartRendering = true;

      // Must ensure DOM is updated before accessing the canvas
      // Keep getting canvas is null errors otherwise
      await this.$nextTick(() => {
        setTimeout(() => {
          try{
            // Destroy pre-existing chart
            if(this.chart){
              this.chart.destroy();
            }

            const canvas = document.getElementById("chartCanvas");
            const ctx = canvas.getContext("2d");

            let dataLabel = "Unknown";
            let chartTitle = "Unknown";
            let extractedData = this.extractData(type);

            switch(type){
              case "skillOverview":
                dataLabel = "Skill";
                chartTitle = "Skill Overview";
                break;

              case "languages":
                dataLabel = "Language";
                chartTitle = "Languages";
                break;

              case "technologies":
                dataLabel = "Technology";
                chartTitle = "Technologies";
                break;

              case "techniques":
                dataLabel = "Technique";
                chartTitle = "Techniques";
                break;

              default:
                // TODO...
            }

            extractedData = extractedData.reduce((accumulator, dataPoint) => {
              accumulator[dataPoint] = (accumulator[dataPoint] || 0) + 1;
              return accumulator;
            }, {});

            this.chart = new Chart(ctx, {
              type: "polarArea",
              data: {
                labels: Object.keys(extractedData),
                datasets: [{
                  label: dataLabel,
                  data: Object.values(extractedData)
                }]
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
                    text: chartTitle
                  }
                }
              }
            });
          }
          catch(error){
            console.error("Error rendering chart: ", error);
          }
          finally{
            this.chartRendering = false;
          }
        }, 1000)
      });
    }
  }
}
</script>

<template>
  <!---------------------- Medium and Larger Screens ----------------------->
  <div class="flex flex-col md:flex-row pt-3 min-h-screen">
    <div class="md:w-1/3 p-3">
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

      <div class="p-2 grid grid-cols-4 gap-4 overflow-hidden whitespace-nowrap text-ellipsis">
        <button @click="this.renderChart('skillOverview')" :disabled="chartRendering" type="submit" class="p-2 w-full bg-red-300 text-peach-black rounded-md hover:bg-red-400 transition duration-300">
          <p class="text-xs md:text-sm truncate ...">
            Overview
          </p>
        </button>
        <button @click="this.renderChart('languages')"  :disabled="chartRendering" type="submit" class="p-2 w-full bg-blue-300 text-peach-black rounded-md hover:bg-blue-400 transition duration-300">
          <p class="text-xs md:text-sm truncate ...">
            Languages
          </p>
        </button>
        <button @click="this.renderChart('technologies')"  :disabled="chartRendering" type="submit" class="p-2 w-full bg-green-300 text-peach-black rounded-md hover:bg-green-400 transition duration-300">
          <p class="text-xs md:text-sm truncate ...">
            Technologies
          </p>
        </button>
        <button @click="this.renderChart('techniques')"  :disabled="chartRendering" type="submit" class="p-2 w-full bg-orange-300 text-peach-black rounded-md hover:bg-orange-400 transition duration-300">
          <p class="text-xs md:text-sm truncate ...">
            Techniques
          </p>
        </button>
      </div>
    </div>
    <div class="w-full md:w-2/3 min-h-[700px] md:h-full justify-items-start">
      <canvas class="md:h-full" id="chartCanvas"></canvas>
    </div>
  </div>

  <div class="w-full text-sm p-4 overflow-x-auto">
    <table class="table-auto border border-peach-black">
      <thead class="border border-peach-black p-2">
        <tr>
          <th class="border border-peach-black p-2">Project</th>
          <th class="border border-peach-black p-2">Languages</th>
          <th class="border border-peach-black p-2">Technologies</th>
          <th class="border border-peach-black p-2">Techniques</th>
        </tr>
      </thead>
      <tbody class="border border-peach-black p-2">
        <tr v-for="(project, index) in this.projects" :key="index"
            class="border border-peach-black hover:bg-peach-pink-lighter">
          <td class="border border-peach-black p-2">
            <a :href="project.link" target="_blank" class="no-underline hover:underline text-blue-600">{{project.name}}</a>
          </td>
          <td class="border border-peach-black p-2">{{project.languages ? project.languages.join(', ') : 'N/A'}}</td>
          <td class="border border-peach-black p-2">{{project.technologies ? project.technologies.join(', ') : 'N/A'}}</td>
          <td class="border border-peach-black p-2">{{project.techniques ? project.techniques.join(', ') : 'N/A'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>