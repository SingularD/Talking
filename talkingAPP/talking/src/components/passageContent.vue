<template>
  <div>
    <h1>{{ title }}</h1>
    <br>
    <p>发表时间：{{ time }}  ||  作者：{{ author }}</p>
    <br>

    <p class="content">{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'passageContent',
  data () {
    return {
      user: this.$route.params.id,
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
.content {
  font-size: 18px;
}
</style>
