<template>
  <div class="homeContent">
    <!--轮播图-->
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <div class="item active img-responsive">
          <img src="../assets/img/backgroud1.jpg">
          <div class="carousel-caption">
          </div>
        </div>
        <div class="item img-responsive">
          <img src="../assets/img/backgroud2.jpg">
          <div class="carousel-caption">
          </div>
        </div>
        <div class="item img-responsive">
          <img src="../assets/img/backgroud1.jpg">
          <div class="carousel-caption">
          </div>
        </div>
      </div>

      <!-- Controls -->
      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <!--文章展示-->
    <div class="passage"></div>
  </div>
</template>

<script>
export default {
  name: 'homeContent',
  mounted () {

  }
}
</script>

<style scoped>
.homeContent{

}
.carousel-inner{
  height: 300px;
  width: 90%;
  margin-left: 5%;
}
img{
}
</style>
