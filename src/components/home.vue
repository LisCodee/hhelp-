<template>
  <div class="home_container">
    <el-container class="h_container">
      <!-- 顶边栏 -->
      <el-header height="82px">
          <!-- 头像，鼠标移入出现个人设置 -->
        <span class="user-center el-icon-user-solid" style="cursor: pointer;" @mouseenter="showmenu"></span>
        <div class="personal" >
            个人设置
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="300px">
          <!-- 菜单栏 -->
          <!-- 动态生成菜单栏 -->
          <span
            v-for="item in menulist"
            :key="item.id"
            @click="selectMenu(item.id, item.path)"
            style="cursor: pointer;"
          >
            <el-row
              :index="item.id"
              :class="selectedId == item.id ? 'selected' : null"
            >
              {{ item.name }}
            </el-row>
          </span>
        </el-aside>
        <!-- main是主题模块 -->
        <el-main>
          主区域
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menulist: [
        { name: '附近药房', id: '1', path: '/pharmacy' },
        { name: '食疗养生', id: '2', path: '/food' },
        { name: '医药配方', id: '3', path: '/formula' },
        { name: '对话专家', id: '4', path: '/expert' },
        { name: '忌吃清单', id: '5', path: '/avoidEat' },
        { name: '运动保健', id: '6', path: '/sport' },
        { name: '在线挂号', id: '7', path: '/sendby' },
        { name: '智能备忘', id: '8', path: '/memo' }
      ],
      selectedId: '1'
    }
  },
  methods: {
    selectMenu(id, path) {
      console.log(path)
      this.selectedId = id
    },
    showmenu(){
        console.log("鼠标移入")
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
  background-image: url('../assets/home.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
element.style {
  height: 82px;
}
.el-header {
  margin-top: 5px;
  margin-right: 20px;
  text-align: right;
  line-height: 82px;
}
.el-aside {
  margin-top: 50px;
  margin-left: 30px;
  text-align: center;
  line-height: 45px;
}
.el-row {
  background-color: #5296fd;
  border-radius: 30px;
  margin-bottom: 15px;
  height: 45px;
  color: #fff;
}
.selected {
  background-color: #003cff;
}
.el-main {
  text-align: center;
  line-height: 160px;
}
.h_container {
  height: 100%;
}
.user-center {
  font-size: 40px;
  color: white;
}
</style>
