<template>
  <div>
    <input type="text" class="form-control title"
           placeholder="Title" v-model="textTitle">

    <form class="form-inline">
      <div class="form-group">
        <label class="sr-only" for="tagOne">tag: </label>
        <input type="text" class="form-control"
               id="tagOne" placeholder="标签一" v-model="tags[0]">
      </div>
      <div class="form-group">
        <label class="sr-only" for="tagTwo">tag: </label>
        <input type="text" class="form-control"
               id="tagTwo" placeholder="标签二" v-model="tags[1]">
      </div>
      <div class="form-group">
        <label class="sr-only" for="tagThree">tag: </label>
        <input type="text" class="form-control"
               id="tagThree" placeholder="标签三" v-model="tags[2]">
      </div>
    </form>

    <textarea class="form-control content" rows="3"
              placeholder="Input your content"
              v-model="content">
    </textarea>
    <br/>
    <button type="button" class="btn btn-success" @click="submitPassage">提交</button>
  </div>
</template>

<script>
export default {
  name: 'write',
  data () {
    return {
      textTitle: '',
      content: '',
      time: '',
      tags: ['', '', '']
    }
  },
  methods: {
    submitPassage () {
      this.time = this.getFormTime()
      let passage = {
        title: this.textTitle,
        content: this.content,
        datetime: this.time,
        tags: this.tags
      }
      this.axios.post('/write', passage).then(function (response) {
        if (response.data.status === '提交成功！') {
          alert('提交成功')
        }
      })
    }
  }
}
</script>

<style scoped>
.form-control{
  width: 70%;
  margin-left: 15%;
}
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
    margin-left: 13.1%;
  }
</style>
