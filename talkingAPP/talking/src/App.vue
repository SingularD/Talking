<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Talking</a>
          <!--首页标签-->
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="/passagesList">文章<span class="sr-only">(current)</span></a></li>
            <li><a href="#">Link</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">个人 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <!--条件渲染个人选项-->
                <li v-if="isShowPersonLogin"><a href="/login">请先登录</a></li>
                <li v-if="logined">
                  <router-link :to="{ name: 'user', params: { id: username }}">
                    文章
                  </router-link>
                </li>
                <li v-if="logined" role="separator" class="divider"></li>
                <li v-if="logined">
                  <router-link :to="{ name: 'write', params: { id: username }}">
                    发表
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
          <ul class="nav navbar-nav navbar-right">
            <!--显示是否登录-->
            <li v-if="userFlag"><a href="#">你好:{{username}}</a></li>
            <li v-else><router-link to="/login">未登录</router-link></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">登录/注册 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="/login">登录</a></li>
                <li @click="logout"><a>登出</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="/register">注册</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <router-view></router-view>
    <all-passages v-if="isShowAllPassages" @clickLatest="latestToContent" @clickHottest="hottestToContent"></all-passages>
  </div>
</template>

<script>
import allPassages from '@/components/allPassages'
export default {
  components: { allPassages },
  data () {
    return {
      username: '',
      userFlag: false,
      isShowPersonLogin: true,
      logined: false,
      isShowAllPassages: true
    }
  },
  mounted () {
    let self = this
    this.axios.get('/').then(function (response) {
      if (response.data !== '') {
        self.userFlag = true
        self.username = response.data
        self.isShowPersonLogin = false
        self.logined = true
      }
    })
    if (this.$route.path !== '/') {
      this.isShowAllPassages = false
    }
  },
  methods: {
    logout () {
      let data = {
        logoutMessage: 'logout'
      }
      this.axios.post('/logout', data).then(function (response) {
        if (response.data.status === 'ok') {
          window.location.href = '/'
        }
      })
    },
    latestToContent (data) {
      window.location.href = '/user/' + data.latestUser + '/content/' +
        data.latestTitle + '/time/' + data.latestTime
    },
    hottestToContent (data) {
      window.location.href = '/user/' + data.hottestUser + '/content/' +
        data.hottestTitle + '/time/' + data.hottestTime
    }
  }
}
</script>

<style scoped>
.container-fluid{
  width: 70%;
  margin-left: 15%;
}
</style>
