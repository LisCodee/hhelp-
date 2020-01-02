<template>
  <div class="avoid-container">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <span
          v-for="item in list"
          :key="item.pk"
          @click="selectMenu(item.pk, item.fields.content)"
          style="cursor: pointer;"
        >
          <el-row
            class="left-menu"
            :index="item.pk"
            :class="selectedId == item.pk ? 'selected' : null"
          >{{ item.fields.title }}</el-row>
        </span>
      </el-aside>

      <el-container>
        <el-main>{{content}}</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      selectedId: null,
      content: ''
    }
  },
  methods: {
    selectMenu(id, content) {
      console.log(id)
      this.selectedId = id
      this.content = content
    }
  },
  //   进入页面时加载数据
  mounted() {
    this.$axios
      .get('/getBanList/', {
        params: {
          token: window.sessionStorage.getItem('token')
        }
      })
      .then(response => {
        // console.log(response.data.data)
        if (response.data.err_code == 0) {
          var test = response.data.data
          test = JSON.parse(test)
          console.log(test)
          this.list = test
        } else {
          return this.$message.error(response.data.err_msg)
        }
      })
      .catch(function(error) {
        return this.$message.error(error)
      })
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.avoid-container {
  margin-top: 5%;
  margin-left: 3%;
  width: 95%;
  line-height: 100px;
  height: 90%;
}
.selected {
  background-color: rgb(20, 112, 233);
}
</style>