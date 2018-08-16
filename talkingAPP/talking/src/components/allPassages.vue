<template>
  <div class="row">
    <div class="passages latestPassages col-md-5 col-xs-10">
      <h1>最新文章</h1>
      <ul class="list-group">
        <li class="list-group-item"
            v-for="(passage, index) in passages"
            :key="index"
            v-if="isShowTitle(index)">
          <span><a @click="latestToContent(index)">{{ passage.latestTitle }}</a></span>
          <span class="badge">{{ passage.latestPv }}</span>
        </li>
      </ul>
      <a style="float: right">更多...</a>
    </div>
    <div class="passages hottestPassages col-md-5 col-xs-10">
      <h1>最火文章</h1>
      <ul class="list-group">
        <li class="list-group-item"
            v-for="(hottestPassage, index) in hottestPassages"
            :key="index"
            v-if="isShowTitle(index)">
          <span><a @click="hottestToContent(index)">{{ hottestPassage.hottestTitle }}</a></span>
          <span class="badge">{{ hottestPassage.hottestPv }}</span>
        </li>
      </ul>
      <a style="float: right">更多...</a>
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
      for (let i = 0; i < response.data.latestTitles.length; i++) {
        self.passages.push({latestTitle: response.data.latestTitles[i],
          latestPv: response.data.latestPv[i],
          latestTime: self.changeFormTime(response.data.latestTime[i]),
          latestUser: response.data.latestUser[i]})
      }
    })
    this.axios.get('/getHottestPassages').then(function (response) {
      for (let i = 0; i < response.data.hottestTitles.length; i++) {
        self.hottestPassages.push({hottestTitle: response.data.hottestTitles[i],
          hottestPv: response.data.hottestPv[i],
          hottestTime: self.changeFormTime(response.data.hottestTime[i]),
          hottestUser: response.data.hottestUser[i]})
      }
    })
  },
  methods: {
    isShowTitle (index) {
      if (index < 5) {
        return true
      } else {
        return false
      }
    },
    latestToContent (index) {
      let data = this.passages[index]
      this.$emit('clickLatest', data)
    },
    hottestToContent (index) {
      let data = this.hottestPassages[index]
      this.$emit('clickHottest', data)
    }
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
