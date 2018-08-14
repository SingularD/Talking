<template>
  <div id="register">
    <h1>请注册</h1>
    <form>
      <div class="form-group">
        <label class="sr-only">username</label>
        <input type="text" class="form-control" placeholder="账号" v-model="username">
      </div>
      <div class="form-group">
        <label class="sr-only" >Password</label>
        <input type="password" class="form-control" placeholder="密码" v-model="password">
      </div>
      <button type="button" class="btn btn-default" @click="handle">注册</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handle () {
      let data = {
        'username': this.username,
        'password': this.password
      }
      this.axios.post('/register', data)
        .then(function (response) {
          console.log(response)
          alert(response.data.message)
          if (response.data.message === '注册成功！') {
            window.location.href = '/login'
          }
        })
        .catch(function (err) {
          console.log(err)
          alert('提交失败')
        })
      // post请求后回调函数
    }
  }
}
</script>

<style scoped>
  #register{
    width: 60%;
    margin-top: 200px;
    margin-left: 20%;
  }
</style>
