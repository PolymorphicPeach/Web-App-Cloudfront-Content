<script>
import axios from "axios";
import TimeSlotList from "@/view/projects/domain/breakmaster/component/TimeSlotList.vue";
import InstanceConfigView from "@/view/projects/domain/breakmaster/component/InstanceConfigView.vue";
import EmployeeListView from "@/view/projects/domain/breakmaster/component/EmployeeListView.vue";
import BreakGroupView from "@/view/projects/domain/breakmaster/component/BreakGroupView.vue";

export default {
  name: "BreakMasterView",
  components: {
    TimeSlotList,
    InstanceConfigView,
    EmployeeListView,
    BreakGroupView
  },
  data() {
    return {
      groups: [],
      apiGatewayUrl: "https://9ms8ngdurf.execute-api.us-east-1.amazonaws.com/prod/api/911"
    };
  },
  mounted() {

  },

  methods: {
    async resetAll() {
      try {
        const response = await axios.put(`${this.apiGatewayUrl}`);
        console.log("✅ Reset successful:", response.data);
        window.location.reload(); // reload to reflect cleared state
      } catch (err) {
        console.error("❌ Reset failed:", err);
      }
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center mt-4 space-y-8">
    <EmployeeListView />
    <button
        @click="resetAll"
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Reset All Groups and Slots
    </button>

    <BreakGroupView groupName="A" />
    <BreakGroupView groupName="B" />
    <BreakGroupView groupName="C" />

  </div>


</template>

<style scoped>
</style>