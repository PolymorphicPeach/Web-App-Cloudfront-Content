<script>
import QualManagementNavBar from "@/view/projects/domain/qual_management_demo/navigation/QualManagementNavBar.vue";
import WorkerSearchView from "@/view/projects/domain/qual_management_demo/qual_management_views/WorkerSearchView.vue";
import AboutView from "@/view/projects/domain/qual_management_demo/qual_management_views/AboutView.vue";
import AddWorkerView from "@/view/projects/domain/qual_management_demo/qual_management_views/AddWorkerView.vue";

export default{
  name: "QualManagementView",
  components:{
    QualManagementNavBar: QualManagementNavBar,
    AboutView: AboutView,
    WorkerSearchView: WorkerSearchView,
    AddWorkerView: AddWorkerView,

  },
  data(){
    return{
      currentView: "about",
    }
  },
  beforeMount(){

  },
  mounted(){

  },
  methods:{
    changeView(view){
      this.currentView = view;
    }
  }
}
</script>


<template>
  <div class="w-full h-full">
    <QualManagementNavBar @change-view="changeView"/>

    <div v-if="currentView === 'about'">
      <AboutView/>
    </div>

    <div v-if="currentView === 'worker-search'">
      <WorkerSearchView/>
    </div>

    <div v-if="currentView === 'add-worker'">
      <AddWorkerView/>
    </div>
  </div>



</template>


<style scoped>

</style>