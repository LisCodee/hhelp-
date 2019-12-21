<template>
  <div class="map-container">
    <div class="search-box">
      <el-input placeholder="请输入搜索的地名" v-model="keyword" size="small">
        <el-button slot="append" icon="el-icon-search" @click="searchForMap"></el-button>
      </el-input>
    </div>
    <div class="map-box">
      <!-- 地图容器，默认中心为北京，需用户手动点击按钮定位 -->
      <baidu-map class="bm-box" :scroll-wheel-zoom="true" center="北京" :zoom="15">
        <!-- 地图主体区域 -->
        <bm-view class="bm-view"></bm-view>
        <!-- 定位按钮 -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
        <!-- 地点标记 -->
        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        <!-- 搜索结果 -->
        <bm-local-search
          class="bm-search"
          :forceLocal="true"
          :pageCapacity="pageCapacity"
          :keyword="keyword"
          :auto-viewport="true"
          :location="location"
        ></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      location: '',
      center: '北京',
      zoom: 3,
      keyword: '',
      pageCapacity: 9
    }
  },
  props: ['ipAll'],
  methods: {
    // 搜索功能
    searchForMap() {
      console.log(this.keyword)
    }
  }
}
</script>
<style lang="less" scoped>
.bm-view {
  width: 70%;
  height: 550px;
  border: 5px solid #81aff6;
}
.map-container {
  margin-top: 5%;
  margin-left: 3%;
  width: 95%;
  line-height: 100px;
}
.search-box {
  width: 80%;
  transform: translateX(10%);
}
.bm-search {
  border: 5px solid #81aff6;
  width: 20%;
  overflow: auto;
  height: 550px;
  // background: #000;
}
.bm-box {
  display: flex;
}
</style>