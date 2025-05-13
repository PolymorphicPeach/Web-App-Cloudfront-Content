<template>
  <div class="p-4">
    <div class="flex">
      <!-- All Employees -->
      <div class="w-1/2 pr-4 border-r">
        <h2 class="text-lg font-bold mb-2">All Employees</h2>
        <ul>
          <li v-for="emp in allEmployees" :key="emp.name">
            <label>
              <input
                  type="checkbox"
                  :value="emp.name"
                  :checked="selectedNames.includes(emp.name)"
                  @change="toggleSelection(emp.name)"
              />
              {{ emp.name }}
            </label>
          </li>
        </ul>
      </div>

      <!-- Selected Employees Ordered -->
      <div class="w-1/2 pl-4">
        <h2 class="text-lg font-bold mb-2">Priority</h2>
        <ol class="list-decimal list-inside space-y-2">
          <li
              v-for="emp in selectedOrdered"
              :key="emp.name"
              class="border rounded p-2 bg-gray-100"
          >
            {{ emp.name }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmployeeListView",
  data() {
    return {
      allEmployees: [],
      selectedNames: [],
      apiGatewayUrl: "https://9ms8ngdurf.execute-api.us-east-1.amazonaws.com/prod/api/911"
    };
  },
  computed: {
    selectedOrdered() {
      return this.allEmployees.filter(emp =>
          this.selectedNames.includes(emp.name)
      );
    }
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get("https://9ms8ngdurf.execute-api.us-east-1.amazonaws.com/prod/api/911/employees");

        // Catches case where body is a stringified array
        const body = response.data.body;
        this.allEmployees = typeof body === "string" ? JSON.parse(body) : body;

      } catch (err) {
        console.error("Failed to fetch employees:", err);
        this.allEmployees = []; // prevent frontend crash
      }
    }
    ,
    toggleSelection(name) {
      const i = this.selectedNames.indexOf(name);
      if (i === -1) {
        this.selectedNames.push(name);
      } else {
        this.selectedNames.splice(i, 1);
      }
    }
  },
  mounted() {
    this.fetchEmployees();
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
</style>