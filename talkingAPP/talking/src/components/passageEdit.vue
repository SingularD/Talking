<template>
  <div id="passageEdit">
    <input type="text" class="form-control title"
           placeholder="Title" disabled v-model="textTitle">
    <form class="form-inline row">
      <div class="form-group col-sm-3 col-xs-8">
        <label class="sr-only" for="tagOne">tag: </label>
        <input type="text" class="form-control"
               id="tagOne" placeholder="标签一" v-model="tags[0]">
      </div>
      <div class="form-group col-sm-3 col-xs-8">
        <label class="sr-only" for="tagTwo">tag: </label>
        <input type="text" class="form-control"
               id="tagTwo" placeholder="标签二" v-model="tags[1]">
      </div>
      <div class="form-group col-sm-3 col-xs-8">
        <label class="sr-only" for="tagThree">tag: </label>
        <input type="text" class="form-control"
               id="tagThree" placeholder="标签三" v-model="tags[2]">
      </div>
    </form>

    <textarea class="form-control content" rows="12"
              data-provide="markdown"
              placeholder="Input your content"
              v-model="content">
    </textarea>
    <br/>
    <button type="button" class="btn btn-success" @click="submitPassage">提交</button>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'passageEdit',
  components: { VueMarkdown },
  data () {
    return {
      textTitle: '',
      content: '',
      time: '',
      tags: ['', '', '']
    }
  },
  mounted () {
    let self = this
    let data = {
      title: this.$route.params.title,
      time: this.$route.params.time
    }
    this.axios.post('/getPassage', data).then(function (response) {
      self.textTitle = response.data.title
      self.content = response.data.content
      self.tags[0] = response.data.tag1
      self.tags[1] = response.data.tag2
      self.tags[2] = response.data.tag3
    })
  },
  methods: {
    submitPassage () {
      let passage = {
        title: this.textTitle,
        content: this.content,
        dateTime: this.$route.params.time,
        tags: this.tags
      }
      console.log(typeof passage.datetime)
      console.log(passage)
      this.axios.post('/edit', passage).then(function (response) {
        if (response.data === '提交成功！') {
          alert('提交成功')
          window.location.href = '/passagesList'
        }
      })
    }
  }
}
</script>

<style scoped>
  #passageEdit{
    width: 70%;
    margin-left: 15%;
  }
  /*.form-control{*/
  /*width: 70%;*/
  /*margin-left: 15%;*/
  /*}*/
  .title{
    margin-top: 70px;
  }
  .content{
    margin-top: 50px;
  }
  .btn{
    margin-left: 48%;
  }
  .form-inline{
    margin-top: 50px;
    width: 70%;
  }
  .col-xs-8{
    margin-right: 20px;
  }
</style>
