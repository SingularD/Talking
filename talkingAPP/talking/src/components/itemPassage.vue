<template>
  <div class="passageList">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="thumbnail">
          <div class="caption">
            <div class="form-inline">
              <h3 class="form-group">{{ title }}</h3>
              <router-link :to="{ name: 'tagPassages', params: { tag: tag1 }}">
                <span class="label label-info itemTitle form-group" >{{ tag1 }}</span>
              </router-link>
              <router-link :to="{ name: 'tagPassages', params: { tag: tag2 }}">
                <span class="label label-info form-group">{{ tag2 }}</span>
              </router-link>
              <router-link :to="{ name: 'tagPassages', params: { tag: tag2 }}">
                <span class="label label-info form-group">{{ tag3 }}</span>
              </router-link>
            </div>
            <p>{{ intro }}</p>
            <p>{{ dateTime }}</p>
            <p>
              <button type="button" class="btn btn-success"
                      role="button" @click="look">
                查看
              </button>
              <button type="button" class="btn btn-danger" :class="{ disabled: isDisabled }"
                      role="button" @click="deletePassage">
                删除
              </button>
              <button type="button" class="btn btn-warning" :class="{ disabled: isDisabled }"
                      role="button" @click="handleEdit">
                编辑
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemPassage',
  props: ['title', 'intro', 'dateTime', 'username', 'authority', 'tag1', 'tag2', 'tag3'],
  data () {
    return {
      // isDisabled: false
    }
  },
  computed: {
    isDisabled () {
      if (this.authority === this.username) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    look () {
      let data = {
        title: this.title,
        dateTime: this.dateTime,
        username: this.username
      }
      this.$emit('showContent', data)
    },
    deletePassage () {
      this.$emit('deletePassage')
    },
    handleEdit () {
      window.location.href = '/edit/' + this.title + '/time/' + this.dateTime
    }
  }
}
</script>

<style scoped>
.itemTitle{
  margin-left: 30px;
}
  p{
    clear: both;
  }
</style>
