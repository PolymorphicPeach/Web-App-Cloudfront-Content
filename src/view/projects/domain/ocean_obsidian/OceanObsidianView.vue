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
    <button @click="downloadROM">Click here to download pokemon-ocean-obsidian.gba</button>
  </div>
  <div>
    <a href="https://github.com/PolymorphicPeach/pokemon-ocean-obsidian/tree/ocean-obsidian-dev/src" target="_blank">Github link</a>
  </div>
</template>

<style scoped>

</style>