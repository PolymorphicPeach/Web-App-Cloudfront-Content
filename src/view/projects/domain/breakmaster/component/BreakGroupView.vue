<template>
  <div class="p-4 border rounded shadow">
    <h2 class="font-bold text-lg mb-2">Group {{ groupName }}</h2>

    <!-- Editable Member List -->
    <ul>
      <li v-for="(member, index) in members" :key="index">
        <input
            v-model="members[index]"
            type="text"
            class="w-full border px-2 py-1 rounded"
            placeholder="Enter member name"
        />
      </li>
    </ul>

    <!-- Save Button -->
    <button
        @click="saveGroup"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Save
    </button>

    <!-- Last Saved Members -->
    <div class="mt-6 p-3 bg-gray-50 border rounded">
      <h3 class="font-semibold mb-2 text-sm text-gray-700">Current Group</h3>
      <ul class="text-sm text-gray-800 list-disc list-inside">
        <li v-for="(name, idx) in lastSavedMembers" :key="idx" v-if="name">
          {{ idx + 1 }}. {{ name }}
        </li>
      </ul>
      <p class="text-xs text-gray-500 mt-2">Updates in: {{ countdown }}s</p>
    </div>

    <!-- Slot List -->
    <div class="mt-6 p-3 bg-gray-100 border rounded">
      <h3 class="font-semibold mb-2 text-sm text-gray-700">All Assigned Slots</h3>
      <ul class="text-sm text-gray-800 list-disc list-inside">
        <li v-for="(slot, idx) in sortedSlots" :key="idx">
          {{ new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          -
          {{ slot.duration }} min —
          {{ slot.assignedTo || 'Unassigned' }}
        </li>
      </ul>
    </div>

    <!-- Debug Window -->
    <div class="mt-6 p-3 bg-yellow-100 border-l-4 border-yellow-400 rounded">
      <h3 class="font-bold text-yellow-800 mb-2">Debug Slot Response</h3>
      <pre class="text-xs text-yellow-900 overflow-x-auto whitespace-pre-wrap">
{{ JSON.stringify(rawSlotResponse, null, 2) }}
      </pre>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BreakGroupView",
  props: {
    groupName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      members: ["", "", "", "", ""],
      backendUrl: "https://9ms8ngdurf.execute-api.us-east-1.amazonaws.com/prod/api/911",
      pollInterval: null,
      lastSavedMembers: [],
      countdown: 30,
      countdownInterval: null,
      slots: [],
      rawSlotResponse: null,
    };
  },
  computed: {
    sortedSlots() {
      return [...this.slots].sort((a, b) => new Date(a.start) - new Date(b.start));
    },
  },
  methods: {
    async fetchGroup() {
      try {
        const response = await axios.get(
            `${this.backendUrl}/group/${this.groupName}`,
            { timeout: 10000 }
        );
        const groupData = response.data;
        if (groupData && Array.isArray(groupData.members)) {
          const normalized = groupData.members.map((m) =>
              typeof m === "string" ? m : m?.S || ""
          );
          this.members = [...normalized];
          this.lastSavedMembers = [...normalized];
        }
      } catch (err) {
        console.error(`❌ Failed to fetch group "${this.groupName}":`, err);
      }
    },

    async fetchSlots() {
      try {
        const response = await axios.get(
            `${this.backendUrl}/group/${this.groupName}/slots`,
            { timeout: 10000 }
        );
        this.rawSlotResponse = response.data;

        if (Array.isArray(response.data)) {
          this.slots = response.data;
        }
      } catch (err) {
        console.error(`❌ Failed to fetch slots for group "${this.groupName}":`, err);
        this.rawSlotResponse = { error: err.message };
      }
    },

    async saveGroup() {
      try {
        await axios.put(
            `${this.backendUrl}/group/${this.groupName}`,
            { members: this.members },
            { timeout: 10000 }
        );
        this.lastSavedMembers = [...this.members];
        console.log(`✅ Group ${this.groupName} saved successfully.`);
      } catch (err) {
        console.error(`❌ Failed to save group "${this.groupName}":`, err);
      }
    },

    async testFetch() {
      console.log("🧪 Running testFetch...");
      await this.fetchSlots();
    },

    getMembers() {
      return this.members;
    },
  },
  mounted() {
    this.fetchGroup();
    this.testFetch();
    this.pollInterval = setInterval(() => {
      this.fetchGroup();
      this.fetchSlots();
      this.countdown = 30;
    }, 30000);

    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown -= 1;
      }
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.pollInterval);
    clearInterval(this.countdownInterval);
  },
};
</script>