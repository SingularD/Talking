<template>
  <div class="passageList">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="thumbnail">
          <div class="caption">
            <h3>{{ title }}</h3>
            <p>{{ intro }}</p>
            <p>{{ dateTime }}</p>
            <p>
              <button type="button" class="btn btn-success"
                      role="button" @click="look">
                查看
              </button>
              <button type="button" class="btn btn-danger"
                      role="button" @click="deletePassage">
                删除
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
  props: ['title', 'intro', 'dateTime'],
  methods: {
    look () {
      let data = {
        title: this.title,
        dateTime: this.dateTime
      }
      this.$emit('showContent', data)
    },
    deletePassage () {
      this.$emit('deletePassage')
    }
  }
}
</script>

<style scoped>

</style>
