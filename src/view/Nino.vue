<template>
  <div style="height: 500px;">厄尔尼诺现象</div>
  <ThermalMap :width="'900px'" :height="'600px'"></ThermalMap>
</template>

<script>
import ThermalMap from "../components/ThermalMap"

export default {
  name: "ElNino",
  components: {
    ThermalMap
  },
}
</script>

<style>

</style>