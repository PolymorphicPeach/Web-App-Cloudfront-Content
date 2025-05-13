<script>
import axios from "axios";

export default {
  name: "InstanceConfigView",
  data() {
    return {
      backendUrl: "https://9ms8ngdurf.execute-api.us-east-1.amazonaws.com/prod/api/911",
      instanceOn: false,  // purely visual
      loading: false
    };
  },
  methods: {
    async toggleInstance() {
      const confirmed = confirm("Are you sure you want to toggle the EC2 instance?");
      if (!confirmed) return;

      this.loading = true;

      try {
        await axios.post(this.backendUrl);  // no body needed anymore
        console.log("Toggle request sent");

        // Flip the UI state manually (this won't reflect real EC2 state)
        this.instanceOn = !this.instanceOn;

      } catch (error) {
        console.error("Failed to toggle EC2 instance:", error);
        alert("Failed to toggle instance.");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="p-4">
    <button
        @click="toggleInstance"
        :disabled="loading"
        :class="[
        'w-24 h-12 text-white font-bold rounded shadow transition',
        instanceOn ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600',
        loading ? 'opacity-50 cursor-not-allowed' : ''
      ]"
    >
      <span v-if="loading">...</span>
      <span v-else>{{ instanceOn ? 'ON' : 'OFF' }}</span>
    </button>
  </div>
</template>

<style scoped>
button {
  font-size: 16px;
}
</style>