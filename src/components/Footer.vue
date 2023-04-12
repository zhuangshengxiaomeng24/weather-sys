<template>
  <div class="FooterNav">
    <div class="icongroup">
      <img src="../assets/signin/scut.png" />
      <img src="../assets/signin/sysu.png" />
      <img src="../assets/signin/cuhk.png" />
      <img src="../assets/signin/cma.png" />
      <img src="../assets/signin/gdms.png" />
    </div>
    <div class="map">
      <a href="https://www.revolvermaps.com/livestats/5y5mvks5bi1/"
        ><img
          src="//rf.revolvermaps.com/h/m/a/0/ff0000/128/0/5y5mvks5bi1.png"
          alt="Map"
          style="border: 0; width:18vw"
      /></a>
          <!-- width="256" -->
          <!-- height="128" -->
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterNav",
  methods: {},
};
</script>

<style scoped>
.FooterNav {
  display: flex;
  margin-top: 20px;
  /* height: 150px; */
  flex-direction: row;
  background: linear-gradient(to right,#99CCFF, #CCFFFF);
  align-items: center;
  border-radius: 10px;
  justify-content: space-around;
  width: 100%;
  bottom: 0;
  left:0
}

.icongroup {
  display: flex;
  justify-content: space-around;
  /* width:50%; */
  flex-direction: row;
}

.icongroup img {
  /* height: 128px; */
  width:10vw;
}
.map{
    /* width:30% */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>