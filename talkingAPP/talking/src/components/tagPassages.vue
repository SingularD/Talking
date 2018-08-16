<template>
  <div id="tagPassages">
    <h1>以下是标签为：{{ tag }} 的界面</h1>
    <br>
    <br>
    <ul>
      <li v-for="(passage, index) in passages" :key="index">
        <item-passage
          :title=" passage.title "
          :intro=" passage.intro "
          :dateTime=" passage.time "
          :username=" passage.username "
          :authority=" authority "
          :tag1="passage.tag1"
          :tag2="passage.tag2"
          :tag3="passage.tag3"
          @showContent="showPassage"
          @deletePassage="deleteIt(index)">
        </item-passage>
      </li>
    </ul>
  </div>
</template>

<script>
import itemPassage from '@/components/itemPassage'
export default {
  components: {itemPassage},
  name: 'tagPassages',
  data () {
    return {
      tag: '',
      passages: [],
      authority: ''
    }
  },
  mounted () {
    let self = this
    let data = {
      tag: this.$route.params.tag
    }
    this.tag = data.tag
    this.axios.post('/tagPassages', data).then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        self.passages.push({
          title: response.data[i].passage_title,
          username: response.data[i].username,
          time: self.changeFormTime(response.data[i].submit_time),
          intro: response.data[i].passage_content,
          pv: response.data[i].pv,
          tag1: response.data[i].tag1,
          tag2: response.data[i].tag2,
          tag3: response.data[i].tag3})
      }
    })
  },
  methods: {
    showPassage (data) {
      window.location.href = '/user/' + data.username +
        '/content/' + data.title + '/time/' + data.dateTime
    },
    deleteIt (index) {
      let self = this
      let data = {
        title: this.posts[index].title
      }
      this.axios.post('/delete', data).then(function (response) {
        if (response.data === 'ok') {
          self.posts.splice(index, 1)
        } else alert(response.data)
      })
    }
  }
}
</script>

<style scoped>
  #tagPassages{
    width: 67%;
    margin-left: 15%;
    margin-top: 50px;
  }
ul{
  list-style: none;
}
</style>
