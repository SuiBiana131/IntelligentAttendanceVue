<template>
    <div id="a">
        <el-container>
            <el-aside width="200px">
                <el-menu  class="ha"  router>   
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-setting"></i>
                      <span>信息管理</span>
                    </template>
                    <el-menu-item index="/userInformation/UpdateInformation" v-if="this.$store.state.user.role.length==3">信息修改</el-menu-item> 
                    <el-menu-item index="/userInformation/UpdatePassword">密码修改</el-menu-item> 
                  </el-submenu>
                  <el-menu-item index="/userInformation/attendanceSet" v-if="this.$store.state.user.role.length==3">
                    <i class="el-icon-setting"></i>
                  分组管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-divider></el-divider>
                <div class="view">
                  <transition :name="transitionName" >
                    <router-view/>
                  </transition>
                </div>
            </el-main>
        </el-container>
    </div>
    
    
</template>
<style>
.el-main
{
  overflow:auto	;
  height:100%;
}
.slide-right-enter-active,
.slide-left-enter-active
{
  will-change: transform;
  transition: all 500ms;

}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.el-submenu{
  text-align:center;
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.search{
  overflow:hidden;
} 
.searchInput{
  float:right;
  width:200px;
}
.search-left{
  float:left;

}
.search-top{
  margin-right:40px;
}
</style>
<script>
  export default {
    data() {
      return {
        transitionName: '',
      };
    },
    watch: {
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
  }
</script>