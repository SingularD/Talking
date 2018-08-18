<template>
  <div id="comments">
    <h3>评论区</h3>
    <ul>
      <li v-for="(comment, index) in comments" :key="index">
        <div id="itemComment">
          <p>{{ comment.user }} :
            <button type="button" class="btn btn-danger"
                    style="float: right" @click="deleteComment(index)">
              删除
            </button>
            <vue-markdown :source="comment.val"></vue-markdown>
          </p>
          <p>评论时间：{{ comment.time }}</p>
          <br>
          <p>
            <span></span>
          </p>
        </div>
      </li>
    </ul>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="sr-only" for="comment">comment</label>
        <input type="text" class="form-control col-sm-8"
               id="comment" v-model="inputComment">
        <input type="text" style="display: none">
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-default"
                style="float: right"
                @click="inputVal">
          评论
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'comments',
  components: { VueMarkdown },
  data () {
    return {
      comments: [],
      inputComment: '',
      currentUser: ''
    }
  },
  mounted () {
    let data = {
      title: this.$route.params.title,
      time: this.$route.params.time
    }
    let self = this
    this.axios.get('/').then(function (response) {
      self.currentUser = response.data
    })
    this.axios.post('/getComments', data).then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        self.comments.push({
          val: response.data[i].comments,
          user: response.data[i].comment_user,
          time: self.changeFormTime(response.data[i].comment_time)
        })
      }
    })
  },
  methods: {
    inputVal () {
      let self = this
      let data = {
        comment: this.inputComment,
        user: this.currentUser,
        time: this.$route.params.time,
        commentTime: this.getFormTime()
      }
      this.axios.post('/inputComment', data).then(function (response) {
        if (response.data === '评论成功！') {
          alert('评论成功！')
          self.comments.push({
            val: data.comment,
            user: data.user,
            time: self.changeFormTime(data.time)
          })
        }
        self.inputComment = ''
      })
    },
    deleteComment (index) {
      let self = this
      let data = {
        deleteItem: self.comments[index].time
      }
      this.axios.post('/deleteComment', data).then(function (response) {
        if (response.data === '删除成功！') {
          alert('删除成功！')
          self.comments.splice(index, 1)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
