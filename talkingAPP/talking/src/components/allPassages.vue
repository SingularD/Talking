<template>
  <div class="row">
    <div class="passages latestPassages col-md-5 col-xs-10">
      <h1>最新文章</h1>
      <ul class="list-group">
        <li class="list-group-item" v-for="(passage, index) in passages" :key="index">
          <router-link to="/login">
            <span>{{ passage.latestTitle }}</span>
          </router-link>
          <span class="badge">{{ passage.latestPv }}</span>
        </li>
      </ul>
    </div>
    <div class="passages hottestPassages col-md-5 col-xs-10">
      <h1>最火文章</h1>
      <ul class="list-group">
        <li class="list-group-item" v-for="(hottestPassage, index) in hottestPassages" :key="index">
          <router-link to="/login">
            <span>{{ hottestPassage.hottestTitle }}</span>
          </router-link>
          <span class="badge">14</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'allPassages',
  data () {
    return {
      passages: [],
      hottestPassages: []
    }
  },
  mounted () {
    let self = this
    this.axios.get('/getLatestPassages').then(function (response) {
      console.log(response.data)
      for (let i = 0; i < response.data.latestTitles.length; i++) {
        self.passages.push({latestTitle: response.data.latestTitles[i],
          latestPv: response.data.latestPv[i]})
      }
    })
    this.axios.get('/getHottestPassages').then(function (response) {
      console.log(response.data)
      for (let i = 0; i < response.data.hottestTitles.length; i++) {
        self.hottestPassages.push({hottestTitle: response.data.hottestTitles[i],
          hottestPv: response.data.hottestPv[i]})
      }
    })
  }
}
</script>

<style scoped>
.passages{
  float: left;
  /*width: 40%;*/
  margin-left: 5%;
}
  ul{
    list-style: none;
  }
</style>
