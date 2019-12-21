<template>
  <div class="home_container">
    <el-container class="h_container">
      <!-- 顶边栏 -->
      <el-header height="82px">
        <!-- 个人中心 -->
        <div class="person-center">
          <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="user-center">
              <template slot="title">个人中心</template>
              <el-menu-item index="/modify">修改资料</el-menu-item>
              <el-menu-item index="/toexpert">成为专家</el-menu-item>
              <el-menu-item index="logout">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
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
            >{{ item.name }}</el-row>
          </span>
        </el-aside>
        <!-- main是主题模块 -->
        <el-main>
          <!-- 主区域 功能区 -->
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
      selectedId: '1',
      isshowmenu: false
    }
  },
  methods: {
    selectMenu(id, path) {
      console.log(path)
      this.selectedId = id
      this.$router.push(path)
    },
    handleSelect(key, keyPath) {
      if (key === 'logout') {
        window.sessionStorage.clear()
        this.$router.replace('/userlogin')
      } else {
        this.$router.push(key)
      }
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
  margin-top: 12%;
  margin-left: 7%;
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
.person-center {
  display: inline-block;
  width: 55%;
}
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #e6e6e6;
  width: 12%;
  transform: translate(750%, 45%);
  /* transform: translateY(5%); */
}
</style>
