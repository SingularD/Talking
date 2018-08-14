<template>
  <div id="login">
    <h1>请登录</h1>
    <form>
      <div class="form-group">
        <label class="sr-only">username</label>
        <input type="text" class="form-control" placeholder="账号" v-model="username">
      </div>
      <div class="form-group">
        <label class="sr-only" >Password</label>
        <input type="password" class="form-control" placeholder="密码" v-model="password">
      </div>
      <button type="button" class="btn btn-default" @click="handle">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handle () {
      let data = {
        'name': this.username,
        'pswd': this.password
      }
      this.axios.post('/login', data)
        .then(function (response) {
          if (response.data.message === '登录成功！') {
            window.location.href = '/'
          }else alert(response.data.message)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
#login{
  width: 60%;
  margin-top: 200px;
  margin-left: 20%;
}
</style>
