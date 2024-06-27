<script>
export default {
  name: "OceanObsidianView",
  methods: {
    downloadROM(){
      const link = document.createElement('a');
      link.href = "https://ocean-obsidian.s3.amazonaws.com/pokemon-ocean-obsidian.gba";
      link.setAttribute("download", "pokemon-ocean-obsidian.gba");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
}
</script>

<template>
  <div>
    <button @click="downloadROM">Download pokemon-ocean-obsidian.gba</button>
  </div>
</template>

<style scoped>

</style>