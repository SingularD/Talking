<template>
  <div id="passageList">
    <h2 v-if="showBodyTitle">文章列表</h2>
    <router-view></router-view>
    <ul v-if="showList">
      <li v-for="(post, index) in posts" :key="index">
        <item-passage :title="post.title"
                      :intro="post.intro"
                      :dateTime="post.dateTime"
                      :username="params"
                      :authority="authority"
                      :tag1="post.tag1"
                      :tag2="post.tag2"
                      :tag3="post.tag3"
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
  components: { itemPassage },
  name: 'user',
  data () {
    return {
      posts: [],
      params: this.$route.params.id,
      titleParams: this.$route.params.title,
      showList: true,
      showBodyTitle: true,
      authority: ''
    }
  },
  mounted () {
    let data = {
      username: this.params
    }
    if (this.titleParams) {
      this.showList = false
      this.showBodyTitle = false
    }
    this.axios.get('/').then(function (response) {
      self.authority = response.data
    })
    let self = this
    this.axios.post('/user', data).then(function (response) {
      let length = response.data.title.length
      for (let i = 0; i < length; i++) {
        let nowTime = self.changeFormTime(response.data.dateTime[i])
        self.posts.push({
          title: response.data.title[i],
          intro: response.data.content[i],
          dateTime: nowTime,
          tag1: response.data.tag1[i],
          tag2: response.data.tag2[i],
          tag3: response.data.tag3[i]})
      }
    })
  },
  methods: {
    showPassage (data) {
      window.location.href = '/user/' + this.$route.params.id +
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
#passageList{
  width: 67%;
  margin-left: 15%;
  margin-top: 50px;
}
  ul{
    list-style: none;
  }
  h2{
    margin-bottom: 50px;
  }
</style>
