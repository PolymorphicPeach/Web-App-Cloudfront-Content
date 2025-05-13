<script>
import axios from "axios";

export default {
  name: "TimeSlotList",
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      recordedStartInputs: [],
      recordedEndInputs: [],
      persistent911Url: "https://9ms8ngdurf.execute-api.us-east-1.amazonaws.com/prod/api/911",
      now: new Date()
    };
  },
  mounted() {
    this.recordedStartInputs = this.group.slots.map(slot =>
        slot.recordedStart ? this.formatHMS(slot.recordedStart) : ""
    );
    this.recordedEndInputs = this.group.slots.map(slot =>
        slot.recordedEnd ? this.formatHMS(slot.recordedEnd) : ""
    );

    // Optional: refresh every 30s to keep highlighting updated
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 30000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  computed: {
    nextAvailableIndex() {
      return this.group.slots.findIndex(
          slot => new Date(slot.start) <= this.now && !slot.claimedBy
      );
    }
  },
  methods: {
    formatDate(datetime) {
      const d = new Date(datetime);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23" // 24-hour format
      });
    },
    formatHMS(isoString) {
      const date = new Date(isoString);
      const pad = n => n.toString().padStart(2, '0');
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    },
    async persistSlot(index) {
      const slot = this.group.slots[index];
      try {
        await axios.put(`${this.persistent911Url}/slots`, {
          groupName: this.group.groupName,
          start: slot.start,
          claimedBy: slot.claimedBy,
          recordedStart: slot.recordedStart,
          recordedEnd: slot.recordedEnd
        });
        console.log("Slot updated");
      } catch (err) {
        console.error("Failed to update slot:", err);
      }
    },
    setNow(index, field) {
      const now = new Date().toISOString();
      this.group.slots[index][field] = now;
      const formatted = this.formatHMS(now);
      if (field === 'recordedStart') {
        this.recordedStartInputs[index] = formatted;
      } else {
        this.recordedEndInputs[index] = formatted;
      }
      this.persistSlot(index);
    },
    parseInput(index, field) {
      const input = field === 'recordedStart'
          ? this.recordedStartInputs[index]
          : this.recordedEndInputs[index];

      const trimmed = input.trim();
      const dhmsMatch = /^(\d+):(\d{1,2}):(\d{2}):(\d{2})$/.exec(trimmed);
      const hmsMatch = /^(\d{1,2}):(\d{2}):(\d{2})$/.exec(trimmed);
      const base = new Date();

      if (dhmsMatch) {
        const [_, day, hour, min, sec] = dhmsMatch;
        base.setDate(base.getDate() + parseInt(day));
        base.setHours(parseInt(hour), parseInt(min), parseInt(sec), 0);
      } else if (hmsMatch) {
        const [_, hour, min, sec] = hmsMatch;
        base.setHours(parseInt(hour), parseInt(min), parseInt(sec), 0);
      } else {
        console.warn("Invalid time format:", input);
        return;
      }

      this.group.slots[index][field] = base.toISOString();
      this.persistSlot(index);
    }
  }
};
</script>

<template>
  <div class="p-4 border rounded shadow w-64 max-h-[500px] overflow-y-auto">
    <h2 class="text-lg font-bold mb-2">{{ group.groupName }}</h2>

    <div
        v-for="(slot, index) in group.slots"
        :key="index"
        class="mb-4 p-3 border rounded"
        :class="{
        'bg-green-200': index === nextAvailableIndex,
        'bg-gray-100': index !== nextAvailableIndex
      }"
    >
      <div class="text-sm text-gray-600 mb-1">
        {{ formatDate(slot.start) }} ({{ slot.duration }} min) — <b>{{ slot.assignedTo }}</b>
      </div>

      <!-- Claimed By -->
      <input
          v-model="slot.claimedBy"
          class="w-full border rounded p-1 mb-1"
          placeholder="Claimed By"
          @blur="persistSlot(index)"
      />

      <!-- Recorded Start -->
      <div class="flex items-center mb-1">
        <input
            v-model="recordedStartInputs[index]"
            @blur="parseInput(index, 'recordedStart')"
            class="w-36 border rounded p-1"
            placeholder="(DD:)HH:mm:ss"
        />
        <button
            class="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            @click="setNow(index, 'recordedStart')"
        >
          Now
        </button>
      </div>

      <!-- Recorded End -->
      <div class="flex items-center">
        <input
            v-model="recordedEndInputs[index]"
            @blur="parseInput(index, 'recordedEnd')"
            class="w-36 border rounded p-1"
            placeholder="(DD:)HH:mm:ss"
        />
        <button
            class="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            @click="setNow(index, 'recordedEnd')"
        >
          Now
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Keep inputs uniform if added later */
input {
  font-size: 14px;
}
</style>