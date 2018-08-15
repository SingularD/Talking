<template>
  <div>
    <input type="text" class="form-control title"
           placeholder="Title" v-model="textTitle">
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
      time: ''
    }
  },
  mounted () {
    this.time = this.getFormTime()
  },
  methods: {
    submitPassage () {
      let passage = {
        title: this.textTitle,
        content: this.content,
        datetime: this.time
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
    margin-top: 70px;
  }
  .btn{
    margin-left: 48%;
  }
</style>
