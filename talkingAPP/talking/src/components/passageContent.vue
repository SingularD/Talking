<template>
  <div>
    <h1>{{ title }}</h1>
    <br>
    <p>发表时间：{{ time }}  ||  作者：{{ author }}</p>
    <br>
    <vue-markdown :source="content" class="text-center" style="font-size: 20px"></vue-markdown>
    <comments></comments>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import comments from '@/components/commentsArea'
export default {
  name: 'passageContent',
  components: {
    VueMarkdown,
    comments
  },
  data () {
    return {
      title: this.$route.params.title,
      time: this.$route.params.time,
      author: '',
      content: ''
    }
  },
  mounted () {
    let data = {
      user: this.user,
      title: this.title,
      time: this.time
    }
    let self = this
    this.axios.post('/getPassage', data).then(function (response) {
      self.content = response.data.content
      self.author = response.data.author
    })
  }
}
</script>

<style scoped>

</style>
